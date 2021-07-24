const express = require('express');

const path = require('path');

const rootDir = require('../util/path');
const { products } = require('./admin');

const router = express.Router();

const adminData = require('./admin');

//slash route
router.get('/', (req, res, next) => {
    // console.log(adminData.products);
    //rendering dynamic .pug page
    res.render('shop', {
        prods: adminData.products, 
        pageTitle: 'My Shop', 
        path: '/index',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
   // res.sendFile(path.join(rootDir, 'public', 'index.html'));
});

module.exports = router;