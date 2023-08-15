const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    mail: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'user'},
    isGithub: {type: Boolean, required: true, default: false},
    isGoogle: {type: Boolean, required: true, default: false}
})

module.exports = { UserModel : mongoose.model('users', userSchema)}