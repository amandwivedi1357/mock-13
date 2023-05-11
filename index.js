const connection = require("./Config/db");
const express = require("express");
const cors = require("cors");
const app = express();
const { userRouter } = require("./Routes/user.routes.js");
const { quizRouter } = require("./Routes/quizDashboard.routes");
app.use(cors());
app.use(express.json());
app.use("/quiz", quizRouter);
app.use("/", userRouter);
app.get("/", (req, res) => {
  res.send("Home-Page");
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected To DB");
  } catch (err) {
    console.log(err.message);
  }
  console.log(`application running at ${process.env.port}`);
});