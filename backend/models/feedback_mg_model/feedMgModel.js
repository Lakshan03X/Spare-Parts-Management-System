const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  fed_full_name: {
    type: String,
    required: true,
  },
  fed_email: {
    type: String,
    required: true,
  },
  fed_item_name: {
    type: String,
    required: true,
  },
  fed_item_id: {
    type: String,
    required: true,
  },
  fed_rating: {
    type: String,
    required: true,
  },
  fed_feedback: {
    type: String,
    required: true,
  },
});

const FeedbackModel = mongoose.model("Feedbacks Table", feedbackSchema);
module.exports = FeedbackModel;
