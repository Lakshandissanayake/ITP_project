const express = require("express");
const router = express.Router();
//Insert Controller
const BloggerController = require("../Controllers/BloggerControllers");

router.get("/", BloggerController.getAllBlogger);
router.post("/", BloggerController.addBlogger);
router.get("/:id", BloggerController.getById);
router.put("/:id", BloggerController.updateBlogger);
router.delete("/:id", BloggerController.deleteBlogger);

//export
module.exports = router;
