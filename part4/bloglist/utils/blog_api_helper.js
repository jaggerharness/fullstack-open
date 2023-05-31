const Blog = require("../models/blogs");

const initialBlogs = [
  {
    title: "Test Title",
    author: "Test Author",
    url: "testurl.com",
    likes: 37,
  },
  {
    title: "Test Title2",
    author: "Test Author2",
    url: "testurl2.com",
    likes: 42,
  },
  {
    title: "Test Title3",
    author: "Test Author3",
    url: "testurl3.com",
    likes: 1,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
