const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const BloggerRoute = require("./routs/BloggerRoutes");
const connectDB = require("./Config/db.js");
const multer = require('multer');
const path = require('path');
const reservationRoutes = require("./routs/reservationRoutes");


// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));


const Data=require("./routs/don.js");
app.use("/don",Data);

// Logging environment variables
console.log("Loaded Environment Variables:");
console.log(process.env);

// Check MongoDB URL
const URL = process.env.MONGODB_URL;
if (!URL) {
    console.error("MongoDB URL is not defined in the environment variables.");
    process.exit(1); // Exit the process if MongoDB URL is missing
}

console.log("MongoDB URL:", URL); // Log the MongoDB URL

// Connect to MongoDB
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if failed to connect to MongoDB
});

// Routes
app.use("/reservation", reservationRoutes);
app.use("/blogger", BloggerRoute); // Blogger routes
// Add other routes as needed...

// Feedback
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage });

app.post('/upload', upload.single('files'), (req, res) => {
    console.log(req.files);
});

const feedbackRouter = require("./routs/feedbacks.js");
app.use("/feedback", feedbackRouter);

// Pet registration
const petRouter = require("./routs/pets.js");
app.use("/pet", petRouter);

// Additional routes...

// Default route
app.get("/", (req, res) => {
    res.send("API is Running");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




//invintory

const formDataSchema = new mongoose.Schema({
    fullName: String,
    price: Number,  // Changed from phoneNumber to price, and type changed to Number
    licenseNumber: { type: String, unique: true },
    quantity: Number,  // Changed from vehicleType to quantity, and type changed to Number
    availabilityStatus: String,
    rating: Number
  });
  
  const FormData = mongoose.model('FormData', formDataSchema);
  
  app.post('/api/submitFormData', async (req, res) => {
    try {
      const { licenseNumber } = req.body;
      const existingEntry = await FormData.findOne({ licenseNumber });
      if (existingEntry) {
        return res.status(400).json({ message: 'License number already exists.' });
      }
  
      const newFormData = new FormData(req.body);
      await newFormData.save();
      res.status(201).json(newFormData);
    } catch (err) {
      if (err.code === 11000) {
        res.status(409).json({ message: 'License number already exists.' });
      } else {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
    }
  });
  
  app.get('/api/getFormData', async (req, res) => {
    try {
      const formDatas = await FormData.find().sort({ rating: -1 });
      res.status(200).json(formDatas);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.delete('/api/deleteFormData/:id', async (req, res) => {
    try {
      const result = await FormData.findOneAndDelete({ _id: req.params.id });
      if (!result) {
        return res.status(404).json({ message: 'The driver with the given ID was not found.' });
      }
      res.json(result);
    } catch (err) {
      console.error("Error during deletion:", err.message);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
  
  app.put('/api/updateFormData/:id', async (req, res) => {
    try {
      const { licenseNumber } = req.body;
      const driver = await FormData.findById(req.params.id);
      if (driver.licenseNumber !== licenseNumber) {
        const existingEntry = await FormData.findOne({ licenseNumber });
        if (existingEntry) {
          return res.status(400).json({ message: 'License number already exists.' });
        }
      }
  
      const result = await FormData.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!result) {
        return res.status(404).json({ message: 'The driver with the given ID was not found.' });
      }
      res.json(result);
    } catch (err) {
      console.error("Error during update:", err.message);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
  
  app.get('/api/getFormData/:id', async (req, res) => {
    try {
      const driver = await FormData.findById(req.params.id);
      if (!driver) {
        return res.status(404).json({ message: 'Driver not found' });
      }
      res.status(200).json(driver);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.get('/api/reportData', async (req, res) => {
    try {
        const totalItems = await FormData.countDocuments();
        const availableItemsCount = await FormData.countDocuments({ availabilityStatus: 'available' });
        const notAvailableItemsCount = totalItems - availableItemsCount;
  
        const highestPriceItem = await FormData.findOne().sort({ price: -1 }).select('fullName price -_id');
        const lowestQuantityItem = await FormData.findOne().sort({ quantity: 1 }).select('fullName quantity -_id');
  
        res.status(200).json({
            totalItems,
            availableItemsCount,
            notAvailableItemsCount,
            highestPriceItem: highestPriceItem.fullName + " (price = Rs " + highestPriceItem.price.toFixed(2) + " )",
            lowestQuantityItem: lowestQuantityItem.fullName + " (Quantity = " + lowestQuantityItem.quantity + ")"
            
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
  });
  


  //employee

  const employeeSchema = new mongoose.Schema({
    fullName: String,
    phoneNo: String,
    licenseNumber: { type: String, unique: true },
    department: String,
    availabilityStatus: String,
  });
  
  const Employee = mongoose.model('Employee', employeeSchema);



  app.post('/api/submitEmployeeData', async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET route to fetch all employee data
app.get('/api/getEmployees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE route to delete employee data by ID
app.delete('/api/deleteEmployee/:id', async (req, res) => {
    try {
        const result = await Employee.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(204).send();  // No content to send back
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET route to fetch employee data by ID
app.get('/api/getEmployee/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT route to update employee data by ID
app.put('/api/updateEmployee/:id', async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(updatedEmployee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET route to fetch employee report data
app.get('/api/employeeReportData', async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments();
        const activeEmployees = await Employee.countDocuments({ availabilityStatus: "available" });
        const onLeaveEmployees = await Employee.countDocuments({ availabilityStatus: "onLeave" });
        const systemDeptCount = await Employee.countDocuments({ department: "systemManagement" });
        const financialDeptCount = await Employee.countDocuments({ department: "financialManagement" });
        const vetDeptCount = await Employee.countDocuments({ department: "veterinarian" });

        res.status(200).json({
            totalEmployees,
            activeEmployees,
            onLeaveEmployees,
            systemDeptCount,
            financialDeptCount,
            vetDeptCount
        });
    } catch (err) {
        console.error('Failed to fetch employee report data:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

