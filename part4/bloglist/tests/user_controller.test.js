const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");
const User = require("../models/users");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const saltRounds = 10;

  await User.create({
    username: "test_user",
    passwordHash: await bcrypt.hash("testpassword", saltRounds),
    name: "test",
  });
});

describe("user authentication api tests", () => {
  test("users are returned as json", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("valid user is created", async () => {
    const validUser = {
      username: "valid_username",
      password: "valid_password",
      name: "valid_name",
    };
    await api.post("/api/users").send(validUser).expect(201);
  });

  test("creating user with unspecified username and password fails", async () => {
    const newUser = {
      username: "",
      password: "",
      name: "test",
    };
    await api.post("/api/users").send(newUser).expect(400);
  });

  test("creating user with duplicate username fails", async () => {
    const newUser = {
      username: "test_user",
      password: "password",
      name: "test",
    };
    await api.post("/api/users").send(newUser).expect(400);
  });

  test("creating user with invalid username length fails", async () => {
    const newUser = {
      username: "a",
      password: "password",
      name: "test",
    };
    await api.post("/api/users").send(newUser).expect(400);
  });

  test("creating user with invalid password length fails", async () => {
    const newUser = {
      username: "test_username",
      password: "a",
      name: "test",
    };
    await api.post("/api/users").send(newUser).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
