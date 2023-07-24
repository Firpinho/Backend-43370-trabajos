const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    idP: { type: mongoose.Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true, default: 1 }
});

const cartSchema = new mongoose.Schema({
    products : {type: [cartItemSchema], required: true}
});

module.exports = { CartModel: mongoose.model('carts', cartSchema) }