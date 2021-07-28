const Product = require('../models/productModel');

// const products = [];

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: "/admin/add-product",
        formCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

exports.postAddProduct = (req, res, next) => {
    // const product = req.body.title;
    // products.push({ title: product });
    // res.send(products);
    const product = new Product(req.body.title);
    product.save();
    console.log(product);
    res.redirect('/');

};

exports.getProducts = (req, res, next) => {
    // console.log(adminData.products);
    //rendering dynamic .pug page
    Product.fetchAll((products) => {
        res.render('shop', {
        prods: products,
        pageTitle: 'My Shop',
        path: '/index',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
     
    });
    // res.sendFile(path.join(rootDir, 'public', 'index.html'));
};