const services = require('../services/user.services')


const register = async (req, res, next) => {
    try {
        const obj = req.body;
        const newUser = await services.register(obj);
        if(newUser) res.redirect('/user/login');
        else res.redirect('/user/error_register')
    } catch (error) {
        next(error.message)
    }
}

const login = async (req, res, next) => {
    try {
        const {mail, password} = req.body;
        const loggedIn = await services.login(mail, password);
        if(loggedIn) {
            res.redirect('http://localhost:8080/views/');
        }
        else res.redirect('/user/error_login')
    } catch (error) {
        next(error.message)
    }
}

const logout = async (req, res, next) => {
    try {
        req.session.destroy()
        res.redirect('/views/')
    } catch (error) {
        next(error)
    }
}


const google = async (req, res, next) => {
    try {
        res.send('Logueado con google')
    } catch (error) {
        next(error)
    }
}


module.exports = {
    register,
    login,
    logout,
    google
}