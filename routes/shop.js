const express = require('express');

const isAuth = require('../middleware/is-auth');

// const rootDir = require('../util/path');

const shopController = require('../controller/shop');

const router = express.Router();

//slash route
router.get('/', shopController.getIndex);
// //product => GET
router.get('/products', shopController.getProducts);
// //product-details => GET
router.get('/products/:productId', shopController.getProduct);
// //Cart => GET
router.get('/cart', isAuth, shopController.getCart);
// //Cart => POST
router.post('/cart', shopController.postCart);
//Delete item => POST
router.post('/cart-delete-item', shopController.postCartDeleteProduct);
// //Orders => GET
router.get('/order', isAuth, shopController.getOrder);
// //Orders => GET
router.get('/orders/:orderId', isAuth, shopController.getInvoice);
// //Orders => POST
router.post('/create-order', isAuth, shopController.postOrder);
// //checkout => GET
router.get('/checkout', isAuth, shopController.getCheckout);

module.exports = router;