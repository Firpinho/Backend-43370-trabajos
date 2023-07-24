class CartsDaoMongoDB {
  constructor(Cmodel, Pmodel) {
    this.Cmodel = Cmodel;
    this.Pmodel = Pmodel;
  }

  async getById(id) {
    try {
      const result = await this.Cmodel.findById(id);
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async create(data) {
    try {
      const result = await this.Cmodel.create(data);
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async addProduct(cid, pid) {
    try {
      if (!await this.#productExists(pid)) return { msg: "Product does not exists." };
      if (!await this.#isInCart(pid)) return await this.Cmodel.updateOne({ _id: cid }, { $push: { products: { idP: pid } } });
      else return await this.Cmodel.updateOne({'products.idP': pid}, { $inc:  {'products.$.quantity': 1}});
    } catch (error) {
      return error.message;
    }
  }

  async #productExists(pid) {
    const result = await this.Pmodel.findById(pid);
    return result;
  }

  async #isInCart(pid) {
    const result = await this.Cmodel.findOne({ "products.idP": pid });
    return result;
  }
}

module.exports = { CartsDaoMongoDB };
