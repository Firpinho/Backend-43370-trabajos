const {ProductModel} = require("../daos/mongodb/models/product.model");
const {ProductDaoMongoDB} = require("../daos/mongodb/product.dao");
const ProductDao = new ProductDaoMongoDB(ProductModel);

/* const { ProductDaoFS } = require("../daos/filesystem/product.dao");
const ProductDao = new ProductDaoFS('products.json');  */


const getAllService = async () => {
  try {
    const items = await ProductDao.getAll();
    if(!items.length) return { message : 'No hay ningun producto almacenado por el momento.' }
    return items;
  } catch (error) {
    return error.message
  }
};

const getByIdService = async (id) => {
  try {
    const item = await ProductDao.getById(id);
    if(!item) return { message : 'No hay ningun producto con ese ID.' }
    return item;
  } catch (error) {
    return error.message
  }
};

const createService = async (obj) => {
  try {
    const newItem = await ProductDao.create(obj);
    return newItem;
  } catch (error) {
    return error.message
  }
};

const updateService = async (id, obj) => {
  try {
    const updatedItem = await ProductDao.update(id, obj);
    if(!updatedItem) return { message : 'No hay ningun producto con ese ID.' }
    return updatedItem;
  } catch (error) {
    return error.message
  }
};

const deleteService = async (id) => {
  try {
    const deletedItem = await ProductDao.delete(id);
    if(!deletedItem) return { message : 'No hay ningun producto con ese ID.' }
    return deletedItem;
  } catch (error) {
    return error.message
  }
};

module.exports = {
    getAllService,
    getByIdService,
    createService,
    updateService,
    deleteService
}