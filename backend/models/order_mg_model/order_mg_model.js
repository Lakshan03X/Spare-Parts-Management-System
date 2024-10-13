const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const oderSchema = new Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  item_name: {
    type: String,
    required: true,
  },
  item_price: {
    type: String,
    required: true,
  },
  delivery_fee: {
    type: String,
    required: true,
  },
  item_quantity: {
    type: String,
    required: true,
  },
  total_price: {
    type: String,
    required: true,
  },
  payment_methord: {
    type: String,
    required: true,
  },
});

const OderDataModel = mongoose.model("Order Table", oderSchema);
module.exports = OderDataModel;
