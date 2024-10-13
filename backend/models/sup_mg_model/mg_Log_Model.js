const mongoose = require("mongoose");

const SupManagerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  password: String,
});

const SupManagerModel = mongoose.model("sup_Login", SupManagerSchema);
module.exports = SupManagerModel;
