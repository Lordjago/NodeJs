const Product = require('../models/productModel');

//Index routes
exports.getIndex = (req, res, next) => {
    // console.log(adminData.products);
    //rendering dynamic .pug page
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'My Shop',
            path: '/',
            hasProducts: products.length > 0
        });

    });
    // res.sendFile(path.join(rootDir, 'public', 'index.html'));
};

exports.getProductsList = (req, res, next) => {
    // console.log(adminData.products);
    //rendering dynamic .pug page
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
        prods: products,
        pageTitle: 'My Shop',
        path: '/index',
        hasProducts: products.length > 0
    });
     
    });
    // res.sendFile(path.join(rootDir, 'public', 'index.html'));
};

exports.getProducts = (req, res, next) => {
    // // console.log(adminData.products);
    // //rendering dynamic .pug page
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Product List',
            path: '/product',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });

    });
    // res.sendFile(path.join(rootDir, 'public', 'index.html'));
};

exports.getCart = (req, res, next) => {
    // // console.log(adminData.products);
    // //rendering dynamic .pug page
    // Product.fetchAll((products) => {
    res.render('shop/cart', {
        // prods: products,
        pageTitle: 'Cart',
        path: '/cart',
        // hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });

    // });
    // res.sendFile(path.join(rootDir, 'public', 'index.html'));
};
exports.getOrder = (req, res, next) => {
    // // console.log(adminData.products);
    // //rendering dynamic .pug page
    // Product.fetchAll((products) => {
    res.render('shop/order', {
        // prods: products,
        pageTitle: 'Order',
        path: '/order',
        // hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });

    // });
    // res.sendFile(path.join(rootDir, 'public', 'index.html'));
};

exports.getCheckout = (req, res, next) => {
    // // console.log(adminData.products);
    // //rendering dynamic .pug page
    // Product.fetchAll((products) => {
    res.render('shop/cart', {
        // prods: products,
        pageTitle: 'Cart',
        path: '/cart',
        // hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });

    // });
    // res.sendFile(path.join(rootDir, 'public', 'index.html'));
};
