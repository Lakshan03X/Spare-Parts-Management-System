const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  Q1ans: { type: String, required: true },
  Q2ans: { type: String, required: true },
  Q3ans: { type: String, required: true },
  Q4ans: { type: String, required: true },
  Q5ans: { type: String, required: true },
});

const answerModel = mongoose.model("Survey ans", AnswerSchema);
module.exports = answerModel;
