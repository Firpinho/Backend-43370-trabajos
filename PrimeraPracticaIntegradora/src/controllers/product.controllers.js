const {getAllService, getByIdService, createService, updateService, deleteService} = require('../services/product.services');

const getAll = async (req, res, next) => {
    try {
        const products = await getAllService();
        res.status(200).json(products);
    } catch (error) {
        next(error.message);
    }
}

const getById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = await getByIdService(id);
        res.status(200).json(product);
    } catch (error) {
        next(error.message);
    }
}

const create = async (req, res, next) => {
    try {
        const newProduct = await createService(req.body);
        res.status(200).json(newProduct);
    } catch (error) {
        next(error.message);
    }
}

const update = async (req, res, next) => {
    try {
        const {id} = req.params;
        const updatedProduct = await updateService(id, req.body);
        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error.message);
    }
}

const remove = async (req, res, next) => {
    try {
        const {id} = req.params;
        const removedProduct = await deleteService(id);
        res.status(200).json(removedProduct);
    } catch (error) {
        next(error.message);
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}