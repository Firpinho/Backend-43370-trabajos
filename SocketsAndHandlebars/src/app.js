//  IMPORTS

const express = require("express");
const productsRoutes = require("./api/products/products.routes");
const viewsRoutes = require('./api/views/views.routes')
const cartsRoutes = require("./api/carts/carts.routes");
const { engine } = require("express-handlebars");
const { Server } = require("socket.io");
const { ProductManager } = require('./ProductManager/ProductManager')

//  INITIALIZATIONS

const PORT = 8080;
const app = express();

//  MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

//  VIEWENGINE

app.engine("handlebars", engine({
  helpers : {
    slideNumber: (index) => {
      return index+=1;
    },
    index0: function(index, options) {
      if(index === 0) {
        return options.fn(this);
      }
      return options.inverse(this);
    }
  }
}));
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

//  ROUTES

app.use("/", viewsRoutes);
app.use("/products", productsRoutes);
app.use("/carts", cartsRoutes);

// SERVER

const httpServer = app.listen(PORT, () => {
  console.log(`[SERVER] Server listening on port             :::::: ${PORT}`);
});


/**
 *  SOCKET SERVER
 */


const serverSocket = new Server(httpServer);
const homeNamespace = serverSocket.of('/realTimeProducts')
const productManager = new ProductManager('./products.json')

homeNamespace.on('connection', async (socket) => {
  
  console.log('[SERVER] New socket on "/realtimeproducts" ID ::::::', socket.id);
  console.log('[SERVER] Cliente conectado...');

  homeNamespace.emit('products', await productManager.getProducts());

  socket.on('products:allProducts', async () => {
    homeNamespace.emit('products', await productManager.getProducts())
  });

  socket.on('products:newProduct', async (data) => {
    await productManager.addProduct(data);
    homeNamespace.emit('products', await productManager.getProducts())
  });

  socket.on('products:updateProduct', async (data) => {
    await productManager.updateProduct(data.target_id, data);
    homeNamespace.emit('products', await productManager.getProducts())
  });

  socket.on('products:deleteProduct', async (id) => {
    await productManager.deleteProductById(id)
    homeNamespace.emit('products', await productManager.getProducts())
  });

})
