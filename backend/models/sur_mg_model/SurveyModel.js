const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  title: { type: String, required: true },
  Q1: { type: String, required: true },
  Q2: { type: String, required: true },
  Q3: { type: String, required: true },
  Q4: { type: String, required: true },
  Q5: { type: String, required: true },
});

const quationModel = mongoose.model("Survey Qns", AnswerSchema);
module.exports = quationModel;