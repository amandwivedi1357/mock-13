const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModal } = require("../Model/userModel");

const getUser = async (req, res) => {
  try {
    const user_data = await userModal.find();
    res.send(user_data);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user_data = await userModal.findById(id);
    if (user_data) {
      res.send(user_data);
    } else {
      res.send({ msg: "Account Not Found" });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

const registerUser = async (req, res) => {
  let { email, password, isAdmin, name } = req.body;
  try {
    const user_data = await userModal.find({ email });
    if (user_data.length == 0) {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.status(400).send({ msg: "Error In Password Hashing" });
        } else {
          const newuser = new userModal({
            email,
            isAdmin,
            name,
            password: hash,
          });
          await newuser.save();
          res.status(201).send({ msg: "User Succesfully Register" });
        }
      });
    } else {
      res.send({ msg: "User is Already Present" });
    }
  } catch (err) {
    res.status(400).send({ msg: "Invalid Credentials" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user_data = await userModal.find({ email });
    if (user_data.length > 0) {
      bcrypt.compare(password, user_data[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: user_data[0]._id }, "quiz_app");
          res.status(201).send({ msg: "Login Succesfully", token: token });
        } else {
          res.status(400).send({ msg: "Password Is Wrong" });
        }
      });
    } else {
      res.send({ msg: "Email Is Not Registered" });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

module.exports = {
  getUser,
  getSingleUser,
  loginUser,
  registerUser,
};