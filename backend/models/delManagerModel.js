




const mongoose = require('mongoose')


const DelManagerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    password: String
})

const DelManagerModel = mongoose.model("delManager", DelManagerSchema)
module.exports = DelManagerModel