const Product = require('../model/productModel');

const Cart = require('../model/cartController');

//Index routes
exports.getIndex = (req, res, next) => {
    Product.fetchAll()
    .then(([rows]) => {
        res.render('shop/index', {
            prods: rows,
            pageTitle: 'My Shop',
            path: '/index',
            hasProducts: rows.length > 0
        });
        // res.send(rows);
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fileData]) => {
            res.render('shop/products', {
                prods: rows,
                pageTitle: 'Product List',
                path: '/product',
                hasProducts: rows.length > 0,
                activeShop: true,
                productCSS: true
            });
            // res.send(rows);
        })
        .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
    const parseId = req.params.productId;
    Product.findById(parseId)
    .then(([rows]) => {
        res.render('shop/product-detail', {
            product: rows[0],
            pageTitle: rows[0].title,
            path: '/product'
        });
        // res.send(rows);
    })
};


exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart'
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
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
