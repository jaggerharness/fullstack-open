const blogRouter = require("express").Router();
const Blog = require("../models/blogs");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const body = req.body;

  if (!body.title || !body.url) {
    res.status(400).end();
    return;
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || false,
  });

  const savedBlog = await blog.save();
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
