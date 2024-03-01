const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
    title: {type:String, require:true},
    description:{type:String, require:true},
    price: {type:Number, require:true},
});

export const Product = model('Product', ProductSchema);