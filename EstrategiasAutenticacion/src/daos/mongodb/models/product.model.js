const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

/* {
    "name": String,
    "description": Sttring,
    "price": Number,
    "thumbnails": Array,
    "code": String,
    "status": Boolean,
    "category": String,
    "stock": Number
} */



const productSchema = new mongoose.Schema({
    name : {type: String, required: true},
    description: {type: String, required: true, default: "No description."},
    price: {type: Number, required: true},
    thumbnails: {type: Array, required: true, default: []},
    code: {type: String, required: true, unique: true },
    status: {type: Boolean, required: true},
    category: {type: String, required: true},
    stock: {type: Number, required: true}
});

productSchema.plugin(mongoosePaginate)

module.exports = { ProductModel: mongoose.model('products', productSchema) }