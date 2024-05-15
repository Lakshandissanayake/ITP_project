const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
let Feedback = require("../modules/feedback");
const path = require('path')


// }).fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]);


// Route for create
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/')
    },
    filename:(req,file,cb)=>{
        let extention = path.extname(file.originalname)
        cb(null,file.fieldname+"_" + Date.now()+extention)
    }
})

const upload=multer({
    storage:storage
})

router.post("/add", upload.single('image'), (req, res) => {
    const email = req.body.email;
    const type = req.body.type;
    // const image1 = req.files && req.files.image1 ? req.files.image1[0].filename : null;
    // const image2 = req.files && req.files.image2 ? req.files.image2[0].filename : null;
    const date = req.body.date;
    const description = req.body.description;
    let image1;
    if(req.file){
         image1 = req.file?.path;
    }
    else{
         image1 = "no img found";
    }
    
    const newFeedback = new Feedback({
        email,
        type,
        image1,
        date,
        description
    });

    newFeedback.save().then(() => {
        res.json("Feedback added successfully");
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with adding feedback", error: err.message });
    });
});


// Route for read
router.route("/").get((req, res) => {
    Feedback.find().then((feedback) => {
        res.json(feedback);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with fetching feedback", error: err.message });
    });
});

// Route for read
router.route("/reviews").get((req, res) => {
    Feedback.find().then((feedback) => {
        res.json(feedback);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with fetching feedback", error: err.message });
    });
});


// Route for update
router.route("/update/:id").put(async (req, res) => {
    let feedbackId = req.params.id;

    // Check if new images uploaded
    if (req.files && (req.files.image1 || req.files.image2)) {
        // Delete old images if they exist
        if (req.body.old_image1) {
            fs.unlinkSync("./uploads/" + req.body.old_image1);
        }
        if (req.body.old_image2) {
            fs.unlinkSync("./uploads/" + req.body.old_image2);
        }

        // If new images uploaded, update the image filenames
        req.body.image1 = req.files.image1 ? req.files.image1[0].filename : req.body.old_image1;
        req.body.image2 = req.files.image2 ? req.files.image2[0].filename : req.body.old_image2;
    } else {
        // If no new images uploaded, retain the existing image filenames
        req.body.image1 = req.body.old_image1;
        req.body.image2 = req.body.old_image2;
    }

    const { email, type, image1, image2, date, description } = req.body;

    const updateFeedback = {
        email,
        type,
        image1,
        image2,
        date,
        description
    };

    const update=await Feedback.findByIdAndUpdate(feedbackId, updateFeedback)
        .then(() => {
            res.status(200).send({ status: "Feedback updated" });
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating feedback", error: err.message });
        });
});


// Route for delete
router.delete("/delete/:id", async (req, res) => { 
  
    const id = req.params.id;
    const result = await Feedback.findByIdAndDelete(id).then(()=>{
    res.status(200).send({status:"delete complete"  })
}).catch((err)=>{
    res.status(500).send({status:"delete undone", error: err.message })
})
   

});


router.post("/  `/:id", upload.single('file'), async (req, res) => { 
    let id = req.params.id;

    try {
        const updatedCard = await Feedback.findByIdAndUpdate(id, {
            type: req.body.type,
            description: req.body.description,
            
        }, { new: true });

        if (!updatedCard) {
            return res.status(404).send({ status: "Update undone", error: "Card not found" });
        }

        res.status(200).send({ status: "Update complete" });
    } catch (err) {
        res.status(500).send({ status: "Update undone", error: err.message });
    }
});


// Route to get selected feedback details
router.route("/get/:id").get(async (req, res) => {
    let feedbackId = req.params.id;
    await Feedback.findById(feedbackId)
        .then((feedback) => {
            res.status(200).send({ status: "Fetched feedback", feedback: feedback });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with fetching feedback", error: err.message });
        });
});






module.exports = router;
