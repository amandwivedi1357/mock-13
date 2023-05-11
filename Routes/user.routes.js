const express = require("express");
const {
  getUser,
  getSingleUser,
  registerUser,
  loginUser,
} = require("../Controllers/user.controller");

const userRouter = express.Router();
userRouter.get("/user", getUser);
userRouter.get("/:id", getSingleUser);
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);

module.exports = {
  userRouter,
};