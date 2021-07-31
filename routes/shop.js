const express = require('express');

const path = require('path');

// const rootDir = require('../util/path');

const shopController = require('../Controller/shopController');

const router = express.Router();

//slash route
router.get('/', shopController.getIndex);
//slash route
router.get('/product-list', shopController.getProductsList);
//product => GET
router.get('/product', shopController.getProducts);

//Orders => GET
router.get('/order', shopController.getOrder);
//checkout => GET
router.get('/checkout', shopController.getCheckout);

module.exports = router;