// DATABASE

require('./daos/mongodb/connection'); 

//  IMPORTS

const express = require('express');
const {engine} = require('express-handlebars')
const productsRoutes = require('./routes/products.routes');
const cartsRoutes = require('./routes/carts.routes')
const viewsRoutes = require('./routes/views.routes')
const cookieParser = require('cookie-parser')

//  INITIALIZATIONS

const PORT = 8080;
const app = express();

//  MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser())

//  VIEWENGINE

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views',  `${__dirname}/views`);

//  ROUTES

app.use('/products', productsRoutes);
app.use('/carts', cartsRoutes);
app.use('/views', viewsRoutes);

app.listen(PORT, () => {
  console.log(`[SERVER] Server listening on port :::::: `, PORT);
});