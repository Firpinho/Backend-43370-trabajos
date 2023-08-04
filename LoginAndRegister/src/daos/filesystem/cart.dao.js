const fs = require("fs");
const { ProductDaoFS } = require("./product.dao");
const productManager = new ProductDaoFS("./products.json");

class CartDaoFS {
  constructor(path) {
    this.path = `${__dirname}/${path}`;
  }

  async getById(cartID) {
    try {
      if (fs.existsSync(this.path)) {
        cartID = Number(cartID)
        const cartsJSON = await fs.promises.readFile(this.path);
        const carts = JSON.parse(cartsJSON);
        const result = this.#cartExists(carts, cartID);
        if (result) {
          return { message: "Carrito encontrado.", data: result.products };
        }
        return false;
      }
      return { message: `File '${this.path}' not found :(` };
    } catch (error) {
      return error;
    }
  }

  async create(data) {
    /*
     {
        id: number, 
        products: [
            {id: number, quantity: number}
        ]
    } 
    */
    try {
      const carts = await this.#getCarts();
      const id = this.#generateId(carts);
      const newCart = {
        id: id,
        ...data,
      };
      carts.push(newCart);
      fs.promises.writeFile(this.path, JSON.stringify(carts), "UTF-8");
      return {
        message: "Carrito creado con exito!",
        cart: newCart
      }
    } catch (error) {
      return error;
    }
  }

  async addProduct(cartID, productID) {
    try {
      cartID = Number(cartID)
      productID = Number(productID)
      const carts = await this.#getCarts();
      const cart = this.#cartExists(carts, cartID);
      const cartProducts = cart.products;

      if (!(await productManager.getById(productID)))
        return { message: "No existe un producto con ese ID..." };
      if (!cart) return false;

      const productInCart = cartProducts.some(({ id }) => id === productID);

      if (productInCart) {
        const product = cartProducts.find(({ id }) => id === productID);
        product.quantity++;
      } else {
        cartProducts.push({
          id: productID,
          quantity: 1,
        });
      }

      carts[cart] = cart;

      this.#saveCart(carts);

      const result = {
        message: "Producto agregado con exito",
        productAddedID: productID,
        cartModified: cartID,
      };

      return result;

    } catch (error) {
      return error.message;
    }
  }

  async #getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const cartsJSON = await fs.promises.readFile(this.path);
        const carts = JSON.parse(cartsJSON);
        return carts;
      }
      return [];
    } catch (error) {
      return error.message;
    }
  }

  #saveCart(data) {
    fs.promises.writeFile(this.path, JSON.stringify(data), "UTF-8");
  }

  #cartExists(carts, cartID) {
    const cart = carts.find(({ id }) => id === cartID);
    const result = cart ? cart : false;
    return result;
  }

  #generateId(carts) {
    let id = 0;
    carts.forEach((cart) => {
      if (id <= cart.id) id++;
    });
    return id + 1;
  }
}

module.exports = {CartDaoFS};
