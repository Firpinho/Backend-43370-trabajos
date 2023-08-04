const {Router} = require('express');
const {loggedIn} = require('../middlewares/loggedIn')
const controllers = require('../controllers/views.controller');

const router = Router();

/* router.get('/cart/:cid', "controller");*/
router.get('/:id', loggedIn, controllers.getById); 
router.get('/', loggedIn, controllers.getAll);


module.exports = router;