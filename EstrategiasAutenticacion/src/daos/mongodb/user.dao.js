const {createHash, validatePassword} = require('../../utils')

class UserDaoMongoDB {

    constructor(model){
        this.model = model
    }

    async getAll() {
        try {
            const users = this.model.find({}).lean()
            return users;
        } catch (error) {
            return {msg: error.message}
        }
    }

    async getById(id) {
        try {
            const user = this.model.findById(id);
            return user;
        } catch (error) {
            return {msg: error.message}
        }
    }

    async login(mail, password) {
        try {
            const user = await this.model.findOne({mail: mail});
            if (user) {
                if (validatePassword(user, password)) return user
                else return false
            }
        } catch (error) {
            return {msg: error.message}
        }
    }

    async register(obj) {
        try {
            if (obj.mail === 'adminCoder@coder.com' && obj.password === 'adminCod3r123') obj.role = 'admin'
            const user = this.model.create({
                ...obj,
                password: createHash(obj.password)
            });
            return user;
        } catch (error) {
            return {msg: error.message}
        }
    }

    async getByEmail(email) {
        try {
            const user = await this.model.findOne({mail: email});
            if(user) return user
            else return false;
        } catch (error) {
            return {msg: error.message}
        }
    }
}

module.exports = {UserDaoMongoDB}