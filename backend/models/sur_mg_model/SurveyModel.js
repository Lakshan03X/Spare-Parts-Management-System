// models/Survey.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SurveySchema = new Schema({
  title: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String }], 
      answerType: { type: String, enum: ['text', 'multiple-choice'], required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Survey', SurveySchema);
