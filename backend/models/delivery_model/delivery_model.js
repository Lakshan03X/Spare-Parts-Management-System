




const mongoose = require('mongoose')


const DeliverySchema = new mongoose.Schema({
    cus_name: String,
    cus_email: String,
    cus_address: String,
    cus_phone: Number,
    delP_name: String,
    delP_email: String,
    item_name: String,
    item_quantity: String,
    total_price:   String,
    delivery_status: String

})

const DeliveryModel = mongoose.model("delivery", DeliverySchema)
module.exports = DeliveryModel