const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
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

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" })
  }

  const user = await User.findById(decodedToken.id);

  if (!body.title || !body.url) {
    res.status(400).end();
    return;
  }

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

  if (!id) {
    res.status(400).end();
    return;
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
