class CartsDaoMongoDB {
  constructor(Cmodel, Pmodel) {
    this.Cmodel = Cmodel;
    this.Pmodel = Pmodel;
  }

  async getById(id) {
    try {
      const result = await this.Cmodel.findById(id).populate('products._id').lean();
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
      const cart = await this.Cmodel.findById(cid);
      const exists = cart.products.find((product) => product.id === pid) 

      if (!await this.#productExists(pid)) return { msg: "Product does not exists." };
      if (!exists) {
        cart.products.push({
          _id: pid
        });
      }else exists.quantity += 1
      cart.save()
      return {msg: "Product added"}
    } catch (error) {
      return error.message;
    }
  }

  async updateQuantity(pid, quantity) {
    try {
      return await this.Cmodel.updateOne({'products._id': pid}, {'products.$.quantity': quantity});
    } catch (error) {
      return error.message;
    }
  }

  async removeProduct(cid, pid) {
    try {
      const cart = await this.Cmodel.findById(cid);
      const product = cart.products.find((product) => product.id === pid) 

      if (!await this.#productExists(pid)) return { msg: "Product does not exists." };

      if (product.quantity > 1) product.quantity --
      else {
        const index = cart.products.indexOf(product);
        cart.products.splice(index, 1);
      }
      cart.save()
    } catch (error) {
      return error.message;
    }
  }

  async removeAllProducts(cid) {
    try {
      return await this.Cmodel.updateOne({ _id: cid }, { $pull: { products: {} } });
    } catch (error) {
      return error.message;
    }
  }

  async #productExists(pid) {
    const result = await this.Pmodel.findById(pid);
    return result;
  }

  async #cartNoPopulate(id){
    try {
      const result = await this.Cmodel.findById(id);
      return result;
    } catch (error) {
      return error.message;
    }
  }

}

module.exports = { CartsDaoMongoDB };
