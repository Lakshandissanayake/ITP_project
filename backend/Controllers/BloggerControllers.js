const Blogger = require("../modules/BloggerModel");

const getAllBlogger = async (req, res, next) => {
  let blog;
  // Get all Blogger
  try {
    blog = await Blogger.find();
  } catch (err) {
    console.log(err);
  }
  // not found
  if (!blog) {
    return res.status(404).json({ message: "Blogger not found" });
  }
  // Display all blog
  return res.status(200).json({ blog });
};

// data Insert
const addBlogger = async (req, res, next) => {
  const { name, gmail, topic, Content, imgurl } = req.body;
  let blog;
  try {
    blog = new Blogger({
      name,
      gmail,
      topic,
      Content,
      imgurl,
    });
    await blog.save();
  } catch (err) {
    console.log(err);
  }
  // not insert blogs
  if (!blog) {
    return res.status(404).json({ message: "unable to add Blogger" });
  }
  return res.status(200).json({ blog });
};

//Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blogger.findById(id);
  } catch (err) {
    console.log(err);
  }
  // not available blogs
  if (!blog) {
    return res.status(404).json({ message: "Blogger Not Found" });
  }
  return res.status(200).json({ blog });
};

//Update blog Details
const updateBlogger = async (req, res, next) => {
  const id = req.params.id;
  const { name, gmail, topic, Content, imgurl } = req.body;
  let blogs;
  try {
    blogs = await Blogger.findByIdAndUpdate(id, {
      name: name,
      gmail: gmail,
      topic: topic,
      Content: Content,
      imgurl: imgurl,
    });
    blogs = await blogs.save();
  } catch (err) {
    console.log(err);
  }
  if (!blogs) {
    return res
      .status(404)
      .json({ message: "Unable to Update Blogger Details" });
  }
  return res.status(200).json({ blogs });
};

//Delete blog Details
const deleteBlogger = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blogger.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res
      .status(404)
      .json({ message: "Unable to Delete Blogger Details" });
  }
  return res.status(200).json({ blog });
};

exports.getAllBlogger = getAllBlogger;
exports.addBlogger = addBlogger;
exports.getById = getById;
exports.updateBlogger = updateBlogger;
exports.deleteBlogger = deleteBlogger;
