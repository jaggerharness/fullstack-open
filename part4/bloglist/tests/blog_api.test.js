const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogs");
const helper = require("../utils/blog_api_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjs = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjs.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("blog api tests", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blogs have id property", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });

  test("new blog is added properly", async () => {
    const newBlog = {
      title: "Test Post",
      author: "Test Post Author",
      url: "testurlpost.com",
      likes: 20,
    };
    const response = await api.post("/api/blogs").send(newBlog).expect(201);
    const blogsInDb = await helper.blogsInDb();
    expect(response.body.title).toBe(newBlog.title);
    expect(response.body.author).toBe(newBlog.author);
    expect(response.body.url).toBe(newBlog.url);
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1);
  });

  test("new blog is missing likes property", async () => {
    const newBlog = {
      title: "Test Post",
      author: "Test Post Author",
      url: "testurlpost.com",
    };
    const response = await api.post("/api/blogs").send(newBlog).expect(201);
    expect(response.body.likes).toBe(0);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
