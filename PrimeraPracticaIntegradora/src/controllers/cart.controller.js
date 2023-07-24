const { getByIdService, createService, addProductService } = require('../services/cart.services');

const getById = async (req, res, next) => {
    try {
        const { id } = req.params
        const cart = await getByIdService(id);
        res.status(200).json(cart)
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

module.exports = {
    getById,
    create,
    addProduct
}