const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: Number,
    required: true,
  },
  contact_no: {
    type: Number,
    required: true,
  },
  user_type: {
    type: Number,
    required: true,
  },
});

const UserModel = mongoose.model("Users table", userSchema);
module.exports = UserModel;
