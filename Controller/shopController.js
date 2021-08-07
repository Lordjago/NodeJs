const Product = require('../model/productModel');

const Cart = require('../model/cartController');

//Index routes
exports.getIndex = (req, res, next) => {
    Product.findAll()
    .then(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'My Shop',
            path: '/index',
            hasProducts: products.length > 0
        });
        // res.send(products);
    })
    .catch(err => {
        console.log(err)
    })
};

exports.getProducts = (req, res, next) => {
    Product.findAll()
    .then(products => {
        res.render('shop/products', {
                prods: products,
                pageTitle: 'Product List',
                path: '/product',
                hasProducts: products.length > 0,
                activeShop: true,
                productCSS: true
            });
    })
    .catch(err => {
         console.log(err) 
        });
};

exports.getProduct = (req, res, next) => {
    const parseId = req.params.productId;
    // Product.findAll({where: {id: parseId} })
    //     .then(product => {
    //         res.render('shop/product-detail', {
    //             product: product[0],
    //             pageTitle: product[0].title,
    //             path: '/product'
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });

        //Or
    Product.findByPk(parseId)
    .then( product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/product'
        });
    })
    .catch(err => {
        console.log(err);
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
