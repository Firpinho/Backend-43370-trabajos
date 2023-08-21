const passport = require('passport');
const { Strategy : LocalStrategy } = require('passport-local');
const { UserModel } = require("../daos/mongodb/models/user.model");
const { UserDaoMongoDB } = require('../daos/mongodb/user.dao')
const {validatePassword} = require('../utils')


const userDao = new UserDaoMongoDB(UserModel);
const strategyOptions = {
    usernameField: 'mail',
    passwordField: 'password',
    passReqToCallback: true
}


const register = async(req, email, password, done ) => {
    try {
        const user = await userDao.getByEmail(email);
        if(user) return done(null, false);
        const newUser = await userDao.register(req.body);
        return done(null, newUser);
    } catch (error) {
        console.log(error);
        return done(error, false);
    }
}

const login = async(req, email, password, done ) => {
    try {
        const userLogin = await userDao.login(email);
        if (!userLogin) return done(null, false, {msg: 'Not valid user.'});
        if(!validatePassword(userLogin, password)) return done(null, false, {msg: 'Not valid user.'});
        return done(null, userLogin);
    } catch (error) {
        console.log(error);
        return done(error, false);
    }
}

/**
 * strategies
 */

const registerStrategy = new LocalStrategy(strategyOptions, register)
const loginStrategy = new LocalStrategy(strategyOptions, login)

/**
 * inicializacion
 */

passport.use('login', loginStrategy);
passport.use('register', registerStrategy)


/**
 * Guarda el usuario en req.session.passport
 */
//req.session.passport.user --> id de usuario
passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    const user = await userDao.getById(id);
    return done(null, user)
})