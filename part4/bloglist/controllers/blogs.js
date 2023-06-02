const blogRouter = require("express").Router();
const Blog = require("../models/blogs");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const body = req.body;

  if(!body.title || !body.url){
    res.status(400).end();
    return;
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || false,
  })

  const savedBlog = await blog.save();
  res.status(201).json(savedBlog)
});

module.exports = blogRouter;
