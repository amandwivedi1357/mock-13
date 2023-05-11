const mongoose = require("mongoose");
const quizSchema = new mongoose.Schema(
  {
    creator: String,
    title: String,
    description: String,
    questions: [
      {
        title: String,
        answerOptions: [String, String, String, String],
        correctOptions: [Number],
      },
    ],
    leaderboard: [
      {
        email: String,
        score: Number,
      },
    ],
  },
  { versionKey: false }
);
const quizModal = mongoose.model("quiz", quizSchema);
module.exports = { quizModal };