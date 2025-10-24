const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    image: {
        type: String,
        trim: true,
    }, 
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    url: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    isSubscribed: {
        type: Boolean,
        required: false,
        default: false,
    },
    productID: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, {timestamps: true});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
