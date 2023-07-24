const { CartModel } = require("../daos/mongodb/models/cart.model");
const { ProductModel } = require("../daos/mongodb/models/product.model");
const { CartsDaoMongoDB } = require("../daos/mongodb/cart.dao");
const CartDao = new CartsDaoMongoDB(CartModel, ProductModel);

/* const { CartDaoFS } = require("../daos/filesystem/cart.dao");
const CartDao = new CartDaoFS('./carts.json');  */

const getByIdService = async (id) => {
  try {
    const cart = await CartDao.getById(id);
    if(!cart) return { message : 'No hay ningun carrito con ese ID.' }
    return cart;
  } catch (error) {
    return error.message
  }
};

const createService = async (obj) => {
  try {
    const newCart = await CartDao.create(obj);
    return newCart;
  } catch (error) {
    return error.message
  }
};

const addProductService = async (cid, pid) => {
  try {
    const productAdded = await CartDao.addProduct(cid, pid);
    if(!productAdded) return { message : 'No se ha podido agregar el producto!!!.' }
    return productAdded;
  } catch (error) {
    return error.message
  }
};

module.exports = {
    getByIdService,
    createService,
    addProductService,
}