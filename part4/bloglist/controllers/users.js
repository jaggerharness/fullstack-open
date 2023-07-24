const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/users");

userRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

userRouter.post("/", async (req, res) => {
  const { username, password, name } = req.body;

  const saltRounds = 10;
  const minimumPasswordLength = 3;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  if (!(username && password && name) || password.length < minimumPasswordLength) {
    res.status(400).json("User object invalid");
    return;
  }

  const user = new User({
    username,
    passwordHash,
    name,
  });

  const newUser = await user.save();
  res.status(201).json(newUser);
});

module.exports = userRouter;
