const { Strategy : GoogleStrategy } = require('passport-google-oauth20');
const passport = require('passport');
const { UserModel } = require("../daos/mongodb/models/user.model");
const { UserDaoMongoDB } = require('../daos/mongodb/user.dao')

const userDao = new UserDaoMongoDB(UserModel);

const strategyOptions = {
    clientID: '881899751124-d0sd3b3uremneosvfj74l78dnv3g5682.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/user/oauth2/redirect/accounts.google.com',
    scope: ['profile', 'email'],
    state: true
};


const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile._json.email !== null ? profile._json.email : profile._json.blog
        console.log(profile);
        const user = await userDao.getByEmail(email);
        if(user) return done(null, user);
        //Nota: para los usuarios de terceros hay que crear otro modelo de usuario sin password
        const newUser = userDao.register({
            name:profile._json.given_name+" "+profile._json.family_name,
            mail: email,
            username: profile._json.sub,
            password: '1234',
            role: 'user',
            isGoogle: true
        });
        return done(null, newUser)
    } catch (error) {
        done(error.message, false)
    }
}

passport.use('google', new GoogleStrategy(strategyOptions, registerOrLogin));


passport.serializeUser((user, done)=>{
    done(null, user);
});

passport.deserializeUser((id, done)=>{
    done(null, id);
});