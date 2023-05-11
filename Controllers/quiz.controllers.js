const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { quizModal } = require("../Model/quizModel");

const getQuiz = async (req, res) => {
  const { _sort } = req.query;
  try {
    const quiz_data = await quizModal.find();
    // .sort({ [_sort]: _order })
    // .limit(_limit || 5)
    // .skip((_page - 1) * _limit);
    res.status(200).send(quiz_data);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

const getSingleQuiz = async (req, res) => {
  const id = req.params.id;
  try {
    const quiz_data = await quizModal.findById(id);
    if (quiz_data) {
      res.status(200).send(quiz_data);
    } else {
      res.send({ msg: "quiz data Not Found" });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

const addQuiz = async (req, res) => {
  try {
    const newquiz = new quizModal(req.body);
    await newquiz.save();
    res.status(201).send({ msg: "quiz Succesfully Added" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

const updateQuiz = async (req, res) => {
  let id = req.params.id;
  try {
    let quizdata = await quizModal.findByIdAndUpdate({ _id: id }, req.body);
    res.status(201).send({ msg: "quiz Succesfully Updated" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

const deleteQuiz = async (req, res) => {
  let id = req.params.id;
  try {
    let quizdata = await quizModal.findByIdAndDelete(id);
    res.status(202).send({ msg: "quiz Succesfully Deleted" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

module.exports = {
  getQuiz,
  getSingleQuiz,
  addQuiz,
  updateQuiz,
  deleteQuiz,
};