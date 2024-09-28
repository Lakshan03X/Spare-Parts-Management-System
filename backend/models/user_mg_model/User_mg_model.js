const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  contact_no: { type: String, required: true },
  user_type: { type: String, required: true },
});

const UserModel = mongoose.model("Users table", userSchema);
module.exports = UserModel;
