const {ProductModel} = require("../daos/mongodb/models/product.model");
const {ProductDaoMongoDB} = require("../daos/mongodb/product.dao");
const ProductDao = new ProductDaoMongoDB(ProductModel);


const getAllService = async (limit, page, sort, query) => {
  try {
    sort = (sort === 'desc') ? -1 : 1;
    query = (query) ? {category: query, stock: {$gt: 0}, status: true} : {};
    const items = await ProductDao.getAll(limit, page, query, sort);
    items.status = true
    return items;
  } catch (error) {
    return {status: false, msg: error.message};
  }
};

const getByIdService = async (id) => {
  try {
    const item = await ProductDao.getById(id);
    if(!item) return { status:false, message : 'No hay ningun producto con ese ID.' }
    item.status = true
    return item;
  } catch (error) {
    return {status: false, msg: error.message};
  }
};

const createService = async (obj) => {
  try {
    const newItem = await ProductDao.create(obj);
    return newItem;
  } catch (error) {
    return {status: false, msg: error.message};
  }
};

const updateService = async (id, obj) => {
  try {
    const updatedItem = await ProductDao.update(id, obj);
    if(!updatedItem) return { status:false, message : 'No hay ningun producto con ese ID.' }
    return updatedItem;
  } catch (error) {
    return {status: false, msg: error.message};
  }
};

const deleteService = async (id) => {
  try {
    const deletedItem = await ProductDao.delete(id);
    if(!deletedItem) return { status:false, message : 'No hay ningun producto con ese ID.' }
    return deletedItem;
  } catch (error) {
    return {status: false, msg: error.message};
  }
};

module.exports = {
    getAllService,
    getByIdService,
    createService,
    updateService,
    deleteService
}