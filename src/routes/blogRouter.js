let blog = require("../models/blogModel");
const router = require("express").Router();

//Get all posts
router.get("/all_posts", async (req, res) => {
  const blogs = await blog.find();

  try {
    res.send(blogs);
  } catch (err) {
    res.status(500).send(err);
  }
});
// Add a new post entry
router.post("/add_post", async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const newBlog = new blog({ title, content });
  try {
    await newBlog.save();
    res.json(newBlog);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
//Get one post entry
router.get("/post/:id", async (req, res) => {
  try {
    await blog.findById(req.params.id).then((myblog) => {
      res.status(200).json(myblog);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
//Update a post entry
router.put("/update/:id", async (req, res) => {
  const updates = req.body;
  try {
    await blog
      .findOneAndUpdate({ _id: req.params.id }, updates, { new: true })
      .then((myblog) => {
        res.status(200).json(myblog);
      });
  } catch (err) {
    res.status(400).json(err);
  }
});
//Delete a post entry
router.delete("/delete/:id", async (req, res) => {
  try {
    await blog
      .findByIdAndDelete(req.params.id)
      .then(() => res.status(200).json("Deletion successful"));
  } catch (err) {
    res.status(400).json("Error" + err);
  }
});

module.exports = router;
