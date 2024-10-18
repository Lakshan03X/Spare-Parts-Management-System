






const mongoose = require('mongoose')

// Schema
const CustomerSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    phone: Number,
    password: String
})



const CustomerModel = mongoose.model("customer", CustomerSchema)
module.exports = CustomerModel