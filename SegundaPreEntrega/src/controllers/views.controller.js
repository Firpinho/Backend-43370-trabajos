const productServices = require('../services/product.services');
const {createService} = require('../services/cart.services');

const getAll = async (req, res, next) => {
    try {
        const cartID = await cartCookie(req);

        const { limit, page, sort, query } = req.query
        const response = await productServices.getAllService(limit, page, sort, query);
        const products = response.docs;
        res.status(200).render('home', { data: { products: products, cart: cartID } });
    } catch (error) {
        next(error.message);
    }
}

const getById = async (req, res, next) => {
    try {
        const cartID = await cartCookie(req);

        const {id} = req.params;
        const product = await productServices.getByIdService(id);
        console.log(product);
        res.status(200).render('product', { data: { product: product, cart: cartID } });
    } catch (error) {
        next(error.message);
    }
}


const cartCookie = async (req) => {
    const cookie = req.cookies.cart
    let cartID

    if(!cookie) {
        const cart = await createService();
        res.cookie('cart', cart._id)
        cartID = req.cookies.cart
    }else{
        cartID = cookie
    }

    return cartID
}


module.exports = {
    getAll,
    getById,
    cartCookie
}