// DATABASE

require("./daos/mongodb/connection");

//  IMPORTS

const express = require('express');
const { engine } = require('express-handlebars');
const { Server } = require("socket.io");
const morgan = require("morgan");
const productRouter = require("./routes/products.routes");
const cartRouter = require("./routes/carts.routes");
const chatRouter = require("./routes/chat.routes");
const chatServices = require('./services/message.services')

//  INITIALIZATIONS

const PORT = 8080;
const app = express();

//  MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));
app.use(morgan("dev"));

//  VIEWENGINE

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views' , __dirname + "/views")

//  ROUTES

app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use("/chat", chatRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`[SERVER] Server listening on port :::::: `, PORT);
});



const serverSocket = new Server(httpServer);

const homeNamespace = serverSocket.of('/chat')


homeNamespace.on('connection', async (socket) => {
  
  console.log('[SERVER] New socket on "/chat" ID ::::::', socket.id);
  console.log('[SERVER] Cliente conectado...');  

  homeNamespace.emit('messages', await chatServices.getAll());


  socket.on('products:newMessage', async (data) => {
    await chatServices.createMessage(data)
    homeNamespace.emit('messages', await chatServices.getAll())
  });

  socket.on('products:getAllMessages', async () => {
    homeNamespace.emit('messages', await chatServices.getAll())
  });

})