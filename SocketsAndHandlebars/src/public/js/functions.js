const socket = io("/realTimeProducts");


/**
 * DOM Elements
 */
const form = document.querySelector("form");
const btn_submit = document.getElementById("btn_submit");
const p_title = document.getElementById("product_title");
const p_description = document.getElementById("product_description");
const p_price = document.getElementById("product_price");
const p_code = document.getElementById("product_code");
const p_category = document.getElementById("product_category");
const p_stock = document.getElementById("product_stock");
const p_thumbnails = document.getElementById("product_thumbnail");
const card_container = document.getElementById("cards");

p_thumbnails.disabled = true;

socket.on("products", (data) => {
  card_container.innerHTML = cards(data);
});

/**
 * LISTENERS
 */

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const product = {
    title: p_title.value,
    description: p_description.value,
    price: Number(p_price.value),
    thumbnails: [],
    code: p_code.value,
    status: true,
    category: p_category.value,
    stock: Number(p_stock.value),
  };

  if (!checkFields(product)) {
    socket.emit("products:newProduct", product)
    socket.emit("products:allProducts");
    emptyFields()
  }
});

/**
 * FUNCTIONS
 */

function delete_product(id) {
  socket.emit("products:deleteProduct", id);
}

function update_product(data, id) {

  p_title.value = data.title;
  p_category.value = data.category;
  p_description.value = data.description;
  p_price.value = data.price;
  p_stock.value = data.stock;
  p_code.value = data.code;

  document.getElementById("submit_button_container").innerHTML = '<button id="btn_update" class="btn btn-success"><b>Guardar cambios</b></button>';

  document.getElementById("btn_update").addEventListener("click", () => {
    const productTUpdate = {
      target_id: id,
      title: p_title.value,
      description: p_description.value,
      price: Number(p_price.value),
      code: p_code.value,
      category: p_category.value,
      stock: Number(p_stock.value)
    };

    if (!checkFields(productTUpdate)) {
        socket.emit('products:updateProduct', productTUpdate)
        socket.emit("products:allProducts");
        emptyFields()
        document.getElementById("submit_button_container").innerHTML = '<button type="submit" id="btn_submit" class="btn btn-success"><b>Cargar Producto</b></button>';
    }
  });
}

function checkFields(obj) {
    return Object.values(obj).some((value) => value === "");
}

function emptyFields() {
  p_title.value = ""
  p_description.value = ""
  p_price.value = ""
  p_code.value = ""
  p_category.value = ""
  p_stock.value = ""
}

/**
 * RENDERS
 */

function cards(data) {
  let cards = "";
  data.map((obj) => {
    const productFUpdate = {
      title: obj.title,
      category: obj.category,
      description: obj.description,
      code: obj.code,
      price: obj.price,
      stock: obj.stock,
    };
    cards += `
        <div class="card m-2" style="width: 18rem;">
        <div class="card-body d-flex flex-column">
          <h4 class="card-title">${obj.title}</h4>
          <h6 class="card-text">
            ${obj.category}
          </h6>
          <p class="card-text pt-2">
            ${obj.description}
          </p>
          <div class="bottom mt-auto">
            <p class="card-text"><small class="text-muted">${
              obj.code
            }</small></p>
            <p class="card-text"><span class="price">$<b>${obj.price}</b></span>
              <span class="stock">Stock: <b>${obj.stock}</b></span></p>
            <div class="buttons">
              <button class="update btn btn-primary" id="update" onclick='update_product(${JSON.stringify(
                productFUpdate
              )}, ${obj.id})'>
                <i class="fas fa-gear"></i>
              </button>
              <button class="btn btn-danger" id="delete" onclick="delete_product(${
                obj.id
              })">
                <i class="fas fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
        `;
  });
  return cards;
}

/* 
POR EL MOMENTO NO HAY IMAGENES

function slider(data) {}

function sliderItems(index) {}
 */