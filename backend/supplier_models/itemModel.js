const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const itemSchema = new Schema({
    item_name : {
        type: String,
        required : true,
    },
    item_quantity : {
        type: Number,
        required : true,
    },
    item_model : {
        type: String,
        required : true,
    },
    item_price : {
        type: String,
        required : true,
    },
    item_weight : {
        type: String,
        required : true,
    },
    supplier_company : {
        type: String,
        required : true,
    },
    item_description : {
        type: String,
        required : true,
    },
});

module.exports = mongoose.model(
    "itemModel",
    itemSchema
);