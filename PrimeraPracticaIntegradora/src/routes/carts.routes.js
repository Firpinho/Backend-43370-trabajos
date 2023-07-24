const Router = require('express');
const controllers = require('../controllers/cart.controller')

const router = Router();

router.get('/:id', controllers.getById);
router.post('/', controllers.create);
router.post('/:cid/product/:pid', controllers.addProduct);

module.exports = router