const Product = require('../models/productModel');

//Index routes
exports.getIndex = (req, res, next) => {
    // console.log(adminData.products);
    //rendering dynamic .pug page
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'My Shop',
            path: '/index',
            hasProducts: products.length > 0
        });

    });
    // res.sendFile(path.join(rootDir, 'public', 'index.html'));
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/products', {
            prods: products,
            pageTitle: 'Product List',
            path: '/product',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });

    });
};

exports.getProduct = (req, res, next) => {
    const parseId = req.params.productId;
    Product.findById(parseId, product => {
        res.render('shop/product-detail', {
            product:product,
            pageTitle: product.title,
            path: '/product'
        });
    });
};


exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart'
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    // Product.fetchAll(prodId, product => {
        console.log(prodId);
    // });
    // res.render('shop/cart', {
    //     pageTitle: 'Cart',
    //     path: '/cart'
    // });
};

exports.getOrder = (req, res, next) => {
    res.render('shop/order', {
        pageTitle: 'Order',
        path: '/order'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart'
    });
};
