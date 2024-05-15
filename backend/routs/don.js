const express = require("express");
const router = express.Router();
const Data = require('../modules/data');
const multer = require('multer');
const Card = require("../modules/cardDetails");
const fs = require('fs');
const PDFDocument = require('pdfkit')


var storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, '/public');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname);
    },
});


var upload = multer({
    storage: storage,
}).single();

router.post("/donate", upload, async (req, res) => { 
    try {
        // Create a new donor record
        const donor = new Data({
            name: req.body.name,
            CardNumber: req.body.CardNumber,
            Amount: req.body.Amount,
        });

        // Save the donor record
        await donor.save();

        // Create a new card record
        const card = new Card({
            name: req.body.name,
            CardNumber: req.body.CardNumber,
            ExpDate: req.body.ExpDate,
            CCV: req.body.CCV,
        });

        // Save the card record
        await card.save().then(()=>{
            res.json("donation successfully added!")
        });

       res.redirect("/donate"); 
    } catch (error) {
        console.log(error)
    }
});

router.get("/", (req, res) => {
    res.render('index', { title: "card_details" });
});

router.get("/donate", (req, res) => {
    res.render('sucess', { title: "success" });
});

// Route for read
router.route("/my").get((req, res) => {
    Data.find().then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with fetching feedback", error: err.message });
    });
});
router.route("/cd").get((req, res) => {
    Card.find().then((cardDetails) => {
        res.json(cardDetails);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with fetching feedback", error: err.message });
    });
});


router.get("/admin", async (req, res) => {
    try {
        const data = await Data.find({}).exec();
        res.render("allDonations", {
            title: 'Donations',
            data: data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while retrieving the data.');
    }
});

router.get("/cards", async (req, res) => {
    try {
        const card = await Card.find({}).exec();
        const data = await Data.find({}).exec();
        res.render("myCards", {
            title: 'myCards',
            card: card,
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while retrieving the data.');
    }
})

//update details
router.get("/edit/:id", async (req, res) => {
    let id = req.params.id;
    try {
      const card = await Card.findById(id);
      if (!card) {
        return res.status(404).send('card not found');
      }
      res.render("update", {
        title: 'update',
        card: card,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while retrieving the data.');
    }

  });

  router.post("/update/:id", upload, async (req, res) => { 
    
        let id = req.params.id;

        const updatedcard = await Card.findByIdAndUpdate(id, {
            ExpDate: req.body.ExpDate,
            CCV: req.body.CCV
        }, { new: true }).then(()=>{
            res.status(200).send({status:"Update complete"  })
        }).catch((err)=>{
            res.status(500).send({status:"Update undone", error: err.message })
        })
      
      
   
});




router.get("/delete/:id", async (req, res) => { 
  
        const id = req.params.id;
        const result = await Card.findByIdAndDelete(id).then(()=>{
        res.status(200).send({status:"delete complete"  })
    }).catch((err)=>{
        res.status(500).send({status:"delete undone", error: err.message })
    })
       
    
 });

 //genarate report

 router.get("/generateReport", async (req, res) => {
    try {
        const data = await Data.find({}).exec();
        const cards = await Card.find({}).exec();

        // Create a new PDF document
        const doc = new PDFDocument();

        // Pipe the PDF to a writable stream (in this case, a file)
        const stream = fs.createWriteStream('report.pdf');
        doc.pipe(stream);

        // Add content to the PDF
        doc.fontSize(16).text('Donation Report', { align: 'center' }).moveDown();

        doc.fontSize(14).text('Donations:', { underline: true }).moveDown();
        data.forEach((data, index) => {
            doc.text(`${index + 1}. Name: ${data.name}, Card Number: ${data.CardNumber}, Amount: ${data.Amount}`).moveDown();
        });

        doc.fontSize(14).text('Cards:', { underline: true }).moveDown();
        cards.forEach((card, index) => {
            doc.text(`${index + 1}. Name: ${card.name}, Card Number: ${card.CardNumber}, ExpDate: ${card.ExpDate}, CCV: ${card.CCV}`).moveDown();
        });

        // Finalize the PDF
        doc.end();

        // Send the generated PDF file as a download attachment
        res.download('report.pdf', 'DonationReport.pdf');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while generating the report.');
    }
});

router.get("/search", async (req, res) => {
    try {
        const searchQuery = req.query.name;
        
        // Search for payments by name in both Petshop and Card models
        const data = await Data.find({ name: { $regex: searchQuery, $options: 'i' } }).exec();
        const card = await Card.find({ name: { $regex: searchQuery, $options: 'i' } }).exec();

        // Combine the results from both models
        const payments = [...data, ...card];

        res.render('allDonations', { title: 'Payment Search Results', payments, data: data });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while searching for payments.');
    }
});
 







module.exports = router;