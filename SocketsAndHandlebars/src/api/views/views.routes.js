const { Router } = require('express');
const { ProductManager } = require('../../ProductManager/ProductManager')


const router = Router();
const productManager = new ProductManager('./products.json')

router.get('/', async (req, res) => {
    try {
        const { limit } = req.query
        const products = limit ? await productManager.getProducts(limit) : await productManager.getProducts();
        res.status(200).render("home", {products});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get("/realtimeproducts", (req, res) => {
    res.status(200).render('realTimeProducts');
});


module.exports = router;