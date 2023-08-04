const {UserModel} = require("../daos/mongodb/models/user.model");
const {UserDaoMongoDB} = require("../daos/mongodb/user.dao");

const userDao = new UserDaoMongoDB(UserModel);

const getAll = async () => {
    try {
        const users = await userDao.getAll();
        if (!users) return {msg: 'No existe ningun usuario.'}
        return users
    } catch (error) {
        return {msg: error.message}        
    }
}


const getById = async (id) => {
    try {
        const user = await userDao.getById(id);
        if (!user) return {msg: 'No existe ningun usuario con este ID.'}
        return user
    } catch (error) {
        return {msg: error.message}        
    }
}

const login = async (mail, password) => {
    try {
        const user = await userDao.login(mail, password);
        if (!user) return false
        return user
    } catch (error) {
        return {msg: error.message}        
    }
}

const register = async (obj) => {
    try {
        const user = await userDao.register(obj);
        if (!user) return false
        return user
    } catch (error) {
        return {msg: error.message}        
    }
}

module.exports = {
    getAll,
    login,
    getById,
    register
}