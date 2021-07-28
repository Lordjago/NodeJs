const express = require('express');

const path = require('path');

const rootDir = require('../util/path');

const productController = require('../Controller/productController');

const router = express.Router();
// const products = [];


//admin/add-product => GET
router.get('/add-product', productController.getAddProduct);

//admin/product => POST
//use work for both get and past. we posting into /product so we change the user to post and it its get request we chnage it to get
router.post('/add-product', productController.postAddProduct);

// module.exports = {
//     routes: router,
//     // products: products
// }
module.exports = router;
// exports.products = products;