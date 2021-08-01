const express = require('express');

const path = require('path');

// const rootDir = require('../util/path');

const shopController = require('../controller/shopController');

const router = express.Router();

//slash route
router.get('/', shopController.getIndex);
//product => GET
router.get('/products', shopController.getProducts);
//product-details => GET
router.get('/products/:productId', shopController.getProduct);
//Cart => GET
router.get('/cart', shopController.getCart);
//Cart => POST
router.post('/cart', shopController.postCart);
//Orders => GET
router.get('/order', shopController.getOrder);
//checkout => GET
router.get('/checkout', shopController.getCheckout);

module.exports = router;