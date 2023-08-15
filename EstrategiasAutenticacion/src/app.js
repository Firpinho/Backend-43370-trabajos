// DATABASE

require('./daos/mongodb/connection'); 


//  IMPORTS

const express = require('express');
const session = require('express-session');
const {engine} = require('express-handlebars');
const productsRoutes = require('./routes/products.routes');
const cartsRoutes = require('./routes/carts.routes');
const viewsRoutes = require('./routes/views.routes');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const passport = require('passport');
require('./passport/local-strategy');
require('./passport/github-strategy');
require('./passport/google-strategy');

//  INITIALIZATIONS

const PORT = 8080;
const app = express();
const mongoStoreOptions = {
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/ecommerce',
/*       crypto: {
        secret: "1234"
      } */
    }),
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 120000
    }
}

//  MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use(session(mongoStoreOptions));
app.use(passport.initialize());
app.use(passport.session())

//  VIEWENGINE

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views',  `${__dirname}/views`);

//  ROUTES

app.use('/products', productsRoutes);
app.use('/carts', cartsRoutes);
app.use('/views', viewsRoutes);
app.use('/user', userRoutes)

app.listen(PORT, () => {
  console.log(`[SERVER] Server listening on port :::::: `, PORT);
});