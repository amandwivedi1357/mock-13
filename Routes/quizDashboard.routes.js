const express = require("express");
const {
  getQuiz,
  getSingleQuiz,
  addQuiz,
  deleteQuiz,
  updateQuiz,
} = require("../Controllers/quiz.controllers");
const quizRouter = express.Router();

quizRouter.patch("/:id", updateQuiz);
quizRouter.get("/", getQuiz);
quizRouter.put("/:id", updateQuiz);
quizRouter.delete("/:id", deleteQuiz);
quizRouter.get("/:id", getSingleQuiz);
quizRouter.post("/", addQuiz);
module.exports = {
  quizRouter,
};