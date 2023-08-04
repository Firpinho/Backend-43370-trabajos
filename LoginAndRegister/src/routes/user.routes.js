const {Router} = require('express')
const controllers = require('../controllers/user.controller')
const {notLoggedIn} = require('../middlewares/loggedIn')

const router = Router();

router.post('/register', notLoggedIn, controllers.register);
router.post('/login', notLoggedIn, controllers.login);
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


module.exports = router