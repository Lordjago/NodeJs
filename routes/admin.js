const express = require('express');

const path = require('path');

const rootDir = require('../util/path');

const router = express.Router();

// const products = [];

//admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'public', 'add-product.html'));

});

//admin/product => POST
//use work for both get and past. we posting into /product so we change the user to post and it its get request we chnage it to get
router.post('/product', (req, res, next) => {
   // products.push( {title: req.body.title } );
    res.redirect('/');

});

exports.routes = router;
// exports.products = products;