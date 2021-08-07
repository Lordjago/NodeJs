const express = require('express');

const path = require('path');

const rootDir = require('../util/path');

const adminController = require('../controller/adminController');

const router = express.Router();
// const products = [];


//admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

//admin/product-list => GET
router.get('/product-list', adminController.getAdminProductList);

//admin/product => POST
//use work for both get and past. we posting into /product so we change the user to post and it its get request we chnage it to get
router.post('/add-product', adminController.postAddProduct);
//Edit product
router.get('/edit-product/:productId', adminController.getEditProduct);
// 
router.post('/edit-product', adminController.postEditProduct);

//delete
router.post('/delete-product/', adminController.postDeleteProduct);
// router.get('/product', adminController.getAdminProductList);

// module.exports = {
//     routes: router,
//     // products: products
// }
module.exports = router;
// exports.products = products;