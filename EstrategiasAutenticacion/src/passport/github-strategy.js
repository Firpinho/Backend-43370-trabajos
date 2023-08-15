const { Strategy : GithubStrategy } = require('passport-github2');
const passport = require('passport');
const { UserModel } = require("../daos/mongodb/models/user.model");
const { UserDaoMongoDB } = require('../daos/mongodb/user.dao')

const userDao = new UserDaoMongoDB(UserModel);
const strategyOptions = {
    clientID: 'Iv1.2648602e0a70f237',
    clientSecret: '615c3714ce28f09c735d9a19574d14deb6db9aa0',
    callbackURL: 'http://localhost:8080/user/profile-github'
}


const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile._json.email !== null ? profile._json.email : profile._json.blog
        console.log(profile);
        const user = await userDao.getByEmail(email);
        if(user) return done(null, user);
        //Nota: para los usuarios de terceros hay que crear otro modelo de usuario sin password
        const newUser = userDao.register({
            name:profile.displayName,
            mail: email,
            username: profile.username,
            password: '1234',
            role: 'user',
            isGithub: true
        });
        return done(null, newUser)
    } catch (error) {
        done(error.message, false)
    }
}

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));