const mongoose = require('mongoose');
const cartschema = new mongoose.Schema({
    user_id: String,
    product_id: Number,
    count: Number,
    size: String,
    discount: {
        type: Number,
        default: 0,
    },
})
const Cart = mongoose.model("Cart", cartschema);
module.exports = Cart;