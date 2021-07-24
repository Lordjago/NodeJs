const express = require('express');

const path = require('path');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];

//admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: "/admin/add-product",
        formCSS: true,
        productCSS: true,
        activeAddProduct: true
    });

});

//admin/product => POST
//use work for both get and past. we posting into /product so we change the user to post and it its get request we chnage it to get
router.post('/add-product', (req, res, next) => {
    const product = req.body.title;
    products.push({title: product});
    // res.send(products);
    console.log(products);
    res.redirect('/'); 

});

module.exports = {
    routes: router,
    products: products
}
// exports.routes = router;
// exports.products = products;