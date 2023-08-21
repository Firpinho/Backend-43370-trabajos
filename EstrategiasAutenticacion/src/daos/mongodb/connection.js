const mongoose = require('mongoose');

const connection_string = 'mongodb+srv://firpinho:X3LANYbVBCkxC3qU@cluster0.axhhloq.mongodb.net/ecommerce';
//const connection_string = 'mongodb://127.0.0.1:27017/ecommerce';

//mongod --bind_ip_all --ipv6

try {
    mongoose.connect(connection_string);
    console.log('[SERVER] Database connected successfuly...');
} catch (error) {
    console.log('[ERROR] ', error.message);
}