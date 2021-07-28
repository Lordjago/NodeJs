const express = require('express');

const path = require('path');

// const rootDir = require('../util/path');

const productController = require('../Controller/productController');

const router = express.Router();

//slash route
router.get('/', productController.getProducts);

module.exports = router;