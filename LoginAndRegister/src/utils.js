const {hashSync, compareSync, genSaltSync} = require('bcrypt');


/**
 * 
 * @param {*} password string
 * @returns Password hashed
 */
const createHash = (password) => hashSync(password, genSaltSync(10));

const validatePassword = (user, password) => compareSync(password, user.password);


module.exports = {
    createHash,
    validatePassword
}