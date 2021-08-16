const Product = require('../model/productModel');

const User = require('../model/userModel');

//Index routes
exports.getIndex = (req, res, next) => {
    Product.find()
        .then(products => {
            console.log(products);
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
    Product.find()
    //puplate related fields and select which field is required
    // .select('title price -_id imageUrl')
    //     .populate('userId', 'name')
        .then(products => {
            console.log(products);
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
    Product.findById(parseId)
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
    User.findById("6119537b13ff4f1ea48126fe")
    .populate('cart.items.productId')
    // .execPopulate()
        .then((user) => {
            console.log(user.cart.items);
            const products = user.cart.items;
            res.render('shop/cart', {
                products: products,
                pageTitle: 'Cart',
                path: '/cart'
            });
});
}

exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    User.findById("6119537b13ff4f1ea48126fe")
        .then(user => {
            console.log(user);
            Product.findById(prodId)
            .then((product) => {
                return user.addToCart(product);
                
            })
            
            }).then((product) => {
                res.redirect('/cart');
        })
        .catch((err) => {
            console.log(err);
        })

};
exports.postCartDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    User.findById("6119537b13ff4f1ea48126fe")
        .then((user) => {
            console.log(user);
            return user.removeCartItem(prodId);
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch((err) => {
            console.log(err);
        })
}

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
