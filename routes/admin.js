const express = require('express');

const isAuth = require('../middleware/is-auth');

const adminController = require('../controller/adminController');

const router = express.Router();
// const products = [];


// admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// //admin/product-list => GET
router.get('/product-list', isAuth, adminController.getAdminProductList);

// //admin/product => POST
//use work for both get and past. we posting into /product so we change the user to post and it its get request we chnage it to get
router.post('/add-product', isAuth, adminController.postAddProduct);
// //Edit product
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);
// // 
router.post('/edit-product', isAuth, adminController.postEditProduct);

// //delete
router.post('/delete-product/', isAuth, adminController.postDeleteProduct);

// router.get('/product', adminController.getAdminProductList);

// module.exports = {
//     routes: router,
//     // products: products
// }
module.exports = router;
// exports.products = products;