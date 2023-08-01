const express = require('express');
const controllers = require('../controllers/product.controllers');

const router = express.Router();

router.get('/', controllers.getAll);
router.get('/:id', controllers.getById);
router.post('/', controllers.create);
router.put('/:id', controllers.update);
router.delete('/:id', controllers.remove);

module.exports = router;