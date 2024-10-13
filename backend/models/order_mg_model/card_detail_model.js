const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  card_holder_name: {
    type: String,
    required: true,
  },

  card_holder_no: {
    type: String,
    required: true,
  },

  card_date: {
    type: String,
    required: true,
  },

  card_cvv: {
    type: String,
    required: true,
  },
});

const OderCardDataModel = mongoose.model("Card_D Table", cardSchema);
module.exports = OderCardDataModel;
