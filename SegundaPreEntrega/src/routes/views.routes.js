const express = require('express');
const controllers = require('../controllers/views.controller');

const router = express.Router();

/* router.get('/cart/:cid', "controller");*/
router.get('/:id', controllers.getById); 
router.get('/', controllers.getAll);


module.exports = router;