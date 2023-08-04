const {Router} = require('express');
const controllers = require('../controllers/cart.controller')

const router = new Router();

router.get('/:id', controllers.getById);
router.post('/', controllers.create);
router.post('/:cid/product/:pid', controllers.addProduct);
router.put('/:cid/product/:pid', controllers.updateProductQuantity)
router.put('/:cid', controllers.update)
router.delete('/:cid', controllers.removeAllProducts);
router.delete('/:cid/product/:pid', controllers.removeProduct)

module.exports = router