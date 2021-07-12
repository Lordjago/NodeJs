const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.send("<form action = '/product' method ='POST'><input type ='text' name = 'title'><button type = 'submit'>Add Product</button></form>");

});
//use work for both get and past. we posting into /product so we change the user to post and it its get request we chnage it to get
router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
    // res.send();

});

module.exports = router;