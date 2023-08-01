const { CartModel } = require("../daos/mongodb/models/cart.model");
const { ProductModel } = require("../daos/mongodb/models/product.model");
const { CartsDaoMongoDB } = require("../daos/mongodb/cart.dao");
const CartDao = new CartsDaoMongoDB(CartModel, ProductModel);


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

const updateQuantityService = async (pid, quantity) => {
  try {
    const productremoved = await CartDao.updateQuantity(pid, quantity);
    return productremoved;
  } catch (error) {
    return error.message
  }
};

const removeProductService = async (cid, pid) => {
  try {
    const productremoved = await CartDao.removeProduct(cid, pid);
    return productremoved;
  } catch (error) {
    return error.message
  }
};

const removeAllProductsService = async (cid) => {
  try {
    const productsremoved = await CartDao.removeAllProducts(cid);
    return productsremoved;
  } catch (error) {
    return error.message
  }
};

module.exports = {
    getByIdService,
    createService,
    addProductService,
    removeProductService,
    removeAllProductsService,
    updateQuantityService
}