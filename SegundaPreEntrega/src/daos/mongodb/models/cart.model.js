const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
    quantity: { type: Number, required: true, default: 1 }
});

const cartSchema = new mongoose.Schema({
    products : {type: [cartItemSchema], required: true}
});

module.exports = { CartModel: mongoose.model('carts', cartSchema) }