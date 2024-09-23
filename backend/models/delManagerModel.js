




const mongoose = require('mongoose')


const DelManagerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    password: String
})

// const DeleliverySchema = new mongoose.Schema({
//     delId: String,
//     userName: String,
//     amount: Number,
//     price: Number,
//     address: String
// })

// const DelTrackingSchema = new mongoose.Schema({
//     trackId: String,
//     delId: String,
//     trackDetails: String
// })

// const DelPersonSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     phone: Number,
//     vehicleType: String,
//     address: String,
//     password: String
// })

// const DelReportSchema = new mongoose.Schema({
//     issueId: String,
//     delPersonId: String,
//     issueDetails: String
// })

const DelManagerModel = mongoose.model("delManager", DelManagerSchema)
module.exports = DelManagerModel