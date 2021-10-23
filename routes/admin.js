const express = require('express');

const isAuth = require('../middleware/is-auth');

const adminController = require('../controller/admin');
// const adminController = require('../controller/admin')

// const adminController = require('../controller/admin')

const { check } = require("express-validator");

const router = express.Router();
// const products = [];


// admin/add-product => GET
router.get('/add-product',  isAuth, getAddProduct);

// //admin/product-list => GET
router.get('/product-list', isAuth, getAdminProductList);

// //admin/product => POST
//use work for both get and past. we posting into /product so we change the user to post and it its get request we chnage it to get
router.post('/add-product',[
    check('title')
        .isString()
        .isLength({ min: 3 })
        .trim(),
    check('price').isFloat(),
    check('description')
        .isLength({ min: 5, max: 400 })
        .trim()
], isAuth, postAddProduct);
// //Edit product
router.get('/edit-product/:productId', isAuth, getEditProduct);
// // 
router.post('/edit-product', [
    check('title')
        .isString()
        .isLength({ min: 3 })
        .trim(),
    check('price').isFloat(),
    check('description')
        .isLength({ min: 5, max: 400 })
        .trim()
], isAuth, postEditProduct);

// //delete
router.delete('/product/:productId', isAuth, deleteProduct);

// router.get('/product', getAdminProductList);

// module.exports = {
//     routes: router,
//     // products: products
// }
module.exports = router;
// exports.products = products;