const {Router} = require('express')
const controllers = require('../controllers/user.controller')
const {notLoggedIn} = require('../middlewares/loggedIn')
const passport = require('passport');  


const router = Router();

router.post('/register', notLoggedIn, passport.authenticate('register'), controllers.register);
router.post('/login', notLoggedIn, passport.authenticate('login'), controllers.login);
router.post('/logout', controllers.logout);


/**
 * Views
 */
router.get('/login', notLoggedIn, (req, res) => {
    res.render('login')
})

router.get('/error_login', notLoggedIn, (req, res) => {
    res.render('error_login')
})

router.get('/error_register', notLoggedIn, (req, res) => {
    res.render('error_register')
})

router.get('/register', notLoggedIn, (req, res) => {
    res.render('register')
})

router.get('/register/github', passport.authenticate('github', {scope: ['user:email']}))

router.get('/oauth2/redirect/accounts.google.com', passport.authenticate('google', {assignProperty: 'user'}), controllers.google)

router.get('/profile-github', passport.authenticate('github', {scope: ['user:email']}), (req, res) => {
    res.redirect('/views/')
})



module.exports = router