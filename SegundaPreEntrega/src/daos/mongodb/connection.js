const mongoose = require('mongoose');

const connection_string = 'mongodb://localhost:27017/ecommerce';

try {
    mongoose.connect(connection_string);
    console.log('[SERVER] Database connected successfuly...');
} catch (error) {
    console.log('[ERROR] ', error.message);
}