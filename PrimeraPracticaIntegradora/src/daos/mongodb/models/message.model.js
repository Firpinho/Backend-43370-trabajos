const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    user: {type: String, required: true},
    message: {type: String, required: true}
})

module.exports = { MessageModel: mongoose.model('messages', messageSchema) }