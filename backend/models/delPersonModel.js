




const mongoose = require('mongoose')




const DelPersonSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    vehicleType: String,
    address: String,
    password: String
})



const DelPersonModel = mongoose.model("delPerson", DelPersonSchema)
module.exports = DelPersonModel