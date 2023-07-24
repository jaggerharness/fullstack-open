const blogRouter = require("express").Router();
const Blog = require("../models/blogs");
const User = require("../models/users");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const body = req.body;

  const userId = req.userId; 

  if(!userId){
    res.status(401).end();
    return;
  }

  if (!(body.title && body.url)) {
    res.status(400).end();
    return;
  }

  const user = await User.findById(req.userId);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || false,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  if(!userId){
    res.status(401).end();
    return;
  }

  if (!id) {
    res.status(400).end();
    return;
  }

  const blog = await Blog.findById(id);

  if (!blog || blog.user.toString() !== userId.toString()) {
    return res
      .status(401)
      .json({ error: "cannot delete blog owned by another user" });
  }

  await Blog.findByIdAndDelete(id);
  res.status(204).end();
});

blogRouter.put("/:id", async (req, res) => {
  const { likes } = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { likes },
    { new: true, runValidators: true, context: "query" }
  );
  res.json(updatedBlog);
});

module.exports = blogRouter;
