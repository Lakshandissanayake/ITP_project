const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const Pet = require("../modules/pet");
const path=require('path')

// Image upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, 'public/');
    },
    filename:  (req, file, cb)=> {
        //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        let extension = path.extname(file.originalname);
        cb(null, file.originalname);
    }
});

const upload = multer({ 
    storage: storage
 });

// Route to add a new pet with photo
router.post("/add", upload.single('photo'), (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const breed = req.body.breed;
    const weight = req.body.weight;
    let photo;
    if(req.file){
         photo = '/' + req.file.originalname;
    }
    else{
         photo = "no img found";
    }
    
    const newPet = new Pet({
        photo,
        name,
        age,
        gender,
        breed,
        weight
    });

    newPet.save().then(() => {
        res.json("Pet added successfully");
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with adding Pet", error: err.message });
    });
});

// Route to get all pets(read)
router.route("/").get((req, res) => {
    Pet.find()
        .then(pets => {
            res.json(pets);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Error fetching pets" });
        });
});

// Route to update a pet
router.route("/update/:id").post(async (req, res) => {
    const petId = req.params.id;
    const {  age, weight } = req.body;

    Pet.findByIdAndUpdate(petId, {age,weight }, { new: true })
        .then(pet => {
            res.json({ message: "Pet updated successfully", pet });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Error updating pet" });
        });
});

// Route to delete a pet
router.route("/delete/:id").delete(async (req, res) => {
    const petId = req.params.id;

    await Pet.findByIdAndDelete(petId)
        .then(() => {
            res.json({ message: "Pet deleted successfully" });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Error deleting pet" });
        });
});

// Route to get selected pet details
router.route("/get/:id").get(async (req, res) => {
    const petId = req.params.id;
    
    Pet.findById(petId)
        .then(pet => {
            if (!pet) {
                return res.status(404).json({ error: "Pet not found" });
            }
            res.json(pet);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Error fetching pet" });
        });
});

module.exports = router;
