const fs = require("fs");

class ProductManager {

  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const result = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(result);
        return products;
      } else {
        return [];
      }
    } catch (error) {
      return console.log(
        "Err. al cargar: Ha ocurrido un error al cargar los datos."
      );
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();

    if (!this.#product_exists(products, id))
      return "Err. No existe: No existe un producto con este ID."

    let result;

    products.forEach((product) => {
      if (Object.values(product).includes(id)) {
        result = product;
      }
    });

    return result;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const products = await this.getProducts();

    const product = {
      id: this.#generateId(products),
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };

    if (this.#code_exists(code, products))
      return console.log(
        "Err. Codigo duplicado: Ya existe un producto con este codigo."
      );
    if (this.#validate_fields(product))
      return console.log(
        "Err. Campos vacios: Todos los campos son obligatorios."
      );

    products.push(product);
    await this.#saveProducts(products);
  }

  async deleteProductById(id) {
    const products = await this.getProducts();

    if (!this.#product_exists(products, id))
      return console.log("Err. No existe: No existe un producto con este ID.");

    products.forEach((product) => {
      if (Object.values(product).includes(id)) {
        products.pop(product);
      }
    });

    await this.#saveProducts(products);
  }

  async updateProduct(id, data) {

    const products = await this.getProducts();
    const dataKeys = Object.keys(data);

    if (!this.#product_exists(products, id))
      return console.log("Err. No existe: No existe un producto con este ID.");

    products.forEach((product) => {
      if (Object.values(product).includes(id)) {
        dataKeys.forEach((key) => {
          if (key !== "id") {
            product[key] = data[key];
          }
        });
      }
    });

    this.#saveProducts(products);

  }

  #generateId(products) {
    let id = 0;
    products.forEach((product) => {
      if (product.id >= id) id++;
    });

    return id;
  }

  #code_exists(code, products) {
    const exists = products.some((product) => {
      return product.code === code;
    });

    return exists;
  }

  #validate_fields(product) {
    const result = Object.values(product).some((value) => {
      return value === null || value === undefined || value === "";
    });

    return result;
  }

  #product_exists(products, id) {
    const product_exists = products.some((product) => {
      return product.id === id;
    });

    return product_exists;
  }

  async #saveProducts(products) {
    try {
      if (products != []) {
        await fs.promises.writeFile(this.path, JSON.stringify(products));
      } else {
        return console.log(
          "Err. de guardado: No hay ningun producto para guardar."
        );
      }
    } catch (error) {
      return console.log(
        "Err. de guardado: Ha ocurrido un error al guardar los datos."
      );
    }
  }

}

const test = async () => {

  /* -------------------------------- Instancia ------------------------------- */

  const instance = new ProductManager("./products.json");

  /* ------------------------------------ - ----------------------------------- */

  console.log(await instance.getProducts()); 

  await instance.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
  
  console.log(await instance.getProducts()); 
  
  await instance.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
  
  await instance.addProduct("producto prueba", "", 200, "Sin imagen", "abc124", 25)

  console.log(await instance.getProductById(0));

  console.log(await instance.getProductById(1));

  await instance.updateProduct(0, {
    title: "new title",
    description: "new description"
  });

  console.log(await instance.getProducts());

  await instance.deleteProductById(0);

  console.log(await instance.getProducts());

  /* ------------------------------------ - ----------------------------------- */
  
};

test();
