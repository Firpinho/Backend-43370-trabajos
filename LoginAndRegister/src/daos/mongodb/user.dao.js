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
            if (!this.#findByEmail(mail)) return false;
            const user = await this.model.findOne({mail: mail});
            if (user) {
                if (validatePassword(user, password)) return user.name
                else return false
            }
        } catch (error) {
            return {msg: error.message}
        }
    }

    async register(obj) {
        try {
            if (await this.#findByEmail(obj.mail)) return false;
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

    async #findByEmail(email) {
        try {
            const user = await this.model.findOne({mail: email});
            return user;
        } catch (error) {
            return {msg: error.message}
        }
    }
}

module.exports = {UserDaoMongoDB}