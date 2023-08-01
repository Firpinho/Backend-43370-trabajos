const { getByIdService, createService, addProductService, removeProductService, removeAllProductsService, updateQuantityService } = require('../services/cart.services');
const {cartCookie} = require('./views.controller')

const getById = async (req, res, next) => {
    try {
        const cartID = await cartCookie(req);
        const { id } = req.params
        const cart = await getByIdService(id);
        console.log(cart);
        res.status(200).render('cart', { data: { cartProducts: cart, cart: cartID } })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const newCart = await createService(req.body);
        res.status(200).json(newCart)
    } catch (error) {
        next(error)
    }
}

const addProduct = async (req, res, next) => {
    try {
        const { pid, cid } = req.params
        const result = await addProductService(cid, pid);
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const updateProductQuantity = async (req, res, next) => {
    try {
        const { pid } = req.params
        const quantity = req.body.quantity
        const result = await updateQuantityService(pid, quantity);
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const removeProduct = async (req, res, next) => {
    try {
        const { pid, cid } = req.params
        const result = await removeProductService(cid, pid);
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const removeAllProducts = async (req, res, next) => {
    try {
        const { cid } = req.params
        const result = await removeAllProductsService(cid);
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getById,
    create,
    addProduct,
    removeProduct,
    removeAllProducts,
    updateProductQuantity
}