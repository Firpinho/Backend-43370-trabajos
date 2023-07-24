const mongoose = require('mongoose');

//const connection_string = 'mongodb://127.0.0.1:27017/ecommerce';
const connection_string = 'mongodb://127.0.0.1:27017/ecommerce';

try {
    mongoose.connect(connection_string);
    console.log('[SERVER] Database connected successfuly...');
} catch (error) {
    console.log('[ERROR] ', error.message);
}