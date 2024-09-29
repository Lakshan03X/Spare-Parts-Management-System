




const mongoose = require('mongoose')


const SurManagerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    password: String
})



const SurManagerModel = mongoose.model("surManager", SurManagerSchema)
module.exports = SurManagerModel