const Product = require('../model/productModel');

const User = require('../model/userModel');

const Order = require('../model/orderModel');

const PDFDocument = require('pdfkit')

const fs = require('fs')

const path = require('path')

const ITEMS_PER_PAGE = 3

//Index routes
exports.getIndex = (req, res, next) => {
    //get page number
    const page = +req.query.page || 1
    let totalItems;
    //Count the number of all product to make dynamic pagination link
    Product.find()
    .countDocuments()
    .then((numProduct) => {
        totalItems = numProduct;
        return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
    })
    .then(products => {
            // console.log(products);
        res.render('shop/index', {
            prods: products,
            pageTitle: 'My Shop',
            path: '/index',
            hasProducts: products.length > 0,
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalItems,
            hasPrevious: page > 1,
            nextPage: page + 1,
            prevPage: page - 1,
            lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
        });
    })
    .catch((err) => {
            const error = new Error(err);
            error.httpStatusCode = 500
            return next(error);
            // console.log("Hello");
        });
};

exports.getProducts = (req, res, next) => {
    const page = +req.query.page || 1
    let totalItems;
    //Count the number of all product to make dynamic pagination link
    Product.find()
        .countDocuments()
        .then((numProduct) => {
            totalItems = numProduct;
            return Product.find()
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
        })
        .then(products => {
            // console.log(products);
            res.render('shop/products', {
                prods: products,
                pageTitle: 'Product List',
                path: '/product',
                hasProducts: products.length > 0,
                currentPage: page,
                hasNextPage: ITEMS_PER_PAGE * page < totalItems,
                hasPrevious: page > 1,
                nextPage: page + 1,
                prevPage: page - 1,
                lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
            });
        })
        .catch((err) => {
            const error = new Error(err);
            error.httpStatusCode = 500
            return next(error);
            // console.log("Hello");
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
            path: '/product',
            isLoggedIn: req.session.isLoggedIn
        });
    })
    .catch((err) =>{
         const error = new Error(err);
         error.httpStatusCode =  500
         return next(error);
    });
};




exports.getCart = (req, res, next) => {
    const { _id } = req.session.user
    User.findById(_id)
    .populate('cart.items.productId')
    // .execPopulate()
        .then((user) => {
            console.log(req.session.user);
            // console.log(user.cart.items);
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
    const { _id } = req.session.user
    User.findById(_id)
        .then(user => {
            console.log(user);
            Product.findById(prodId)
                .then((product) => {
                    return user.addToCart(product);

                })
                .then(() => {
                    res.redirect('/cart');
                })
        })
        .catch((err) => {
            const error = new Error(err);
            error.httpStatusCode = 500
            return next(error);
        });

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
            const error = new Error(err);
            error.httpStatusCode = 500
            return next(error);
        });
}

exports.postOrder = (req, res, next) => {
    const {_id} = req.session.user
    User.findById(_id)
        .populate('cart.items.productId')
        .then((user) => {
            console.log(user);
           const products = user.cart.items.map(i => {
               return { quantity: i.quantity, product: {...i.productId._doc} }
           });
            const order = new Order({
                user: {
                    name: user.email,
                    userId: user
                },
                products: products
        })
        return order.save();
    })
    .then(() => {
           return  User.findById(_id);
           
        })
        .then((user)=> {
            user.clearCart(); 
            res.redirect('/order');
        })
        .catch((err) => {
            const error = new Error(err);
            error.httpStatusCode = 500
            return next(error);
        });
};

exports.getOrder = (req, res, next) => {
        const { _id } = req.session.user
    User.findById(_id)
        .then((user) => {
            console.log(user._id);
            Order.find({'user.userId': user._id })
            .then((orders) => {
                  res.render('shop/order', {
                    orders: orders,
                    pageTitle: 'Order',
                      path: '/order',
                      isLoggedIn: req.session.isLoggedIn
                });
            });
            });
  
};

exports.getInvoice = (req, res, next) => {
    const orderId = req.params.orderId
    Order.findById(orderId)
    .then((order) => {
        if(!order) {
            return next(new Error('No Order Found'))
        }
        if (order.user.userId.toString() !== req.session.user._id.toString()) {
            return next(new Error('Unauthorized'))
            
        }
        const invoiceName = 'invoice-' + orderId + '.pdf';
        const invoicePath = path.join('data', 'invoices', invoiceName)
        //Generate pdf file for Order and add it locally to invoice folder
        const pdfDoc = new PDFDocument();
        // res.setHeader('Content-Type', 'application/pdf')
        // res.setHeader('Content-Disposition', 'attachment; filename="' + invoiceName + '"')
        pdfDoc.pipe(fs.createWriteStream(invoicePath))
        pdfDoc.pipe(res)

        //Write to the pdf file

        pdfDoc.fontSize(26).text("Invoice", {
            underline: true,
            align: 'center',
            valign: 'center'
        })
        pdfDoc.text("................................................................")
        let totalPrice = 0;
        order.products.forEach(prod => {
            totalPrice += prod.quantity * prod.product.price
            pdfDoc.fontSize(13).text(prod.product.title + ' - ' + prod.quantity + 'x' + '$' + prod.product.price)
        } )
        pdfDoc.fontSize(16).text("Total Price = $" + totalPrice)

        // Add another page
        pdfDoc
            .addPage()
            .fontSize(25)
            .text('Another page here', {
                align: 'center',
                valign: 'center'
            });

        // Draw a triangle
        // pdfDoc
        //     .save()
        //     .moveTo(100, 150)
        //     .lineTo(100, 250)
        //     .lineTo(200, 250)
        //     .fill('#FF3300');

        // // Apply some transforms and render an SVG path with the 'even-odd' fill rule
        // pdfDoc
        //     .scale(0.6)
        //     .translate(470, -380)
        //     .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
        //     .fill('red', 'even-odd')
        //     .restore();
        pdfDoc.end();
        // fs.readFile(invoicePath, (err, data) => {
        //          if (err) {
        //             return next(new Error('Unable to Open file'))
        //         }
        //         res.setHeader('Content-Type', 'application/pdf')
        //         res.setHeader('Content-Disposition', 'attachment; filename="' + invoiceName + '"')
        //         res.send(data)
        //     });
        // const file = fs.createReadStream(invoicePath)
        // res.setHeader('Content-Type', 'application/pdf')
        // res.setHeader('Content-Disposition', 'attachment; filename="' + invoiceName + '"')
        // file.pipe(res)
    })
    .catch((err) => {
        return next(new Error())
    })

}

exports.getCheckout = (req, res, next) => {
    const { _id } = req.session.user
    User.findById(_id)
        .populate('cart.items.productId')
        // .execPopulate()
        .then((user) => {
            const products = user.cart.items;
            let total = 0;
            products.forEach(p => {
                total += p.quantity * p.productId.price
            })
            res.render('shop/checkout', {
                products: products,
                pageTitle: 'Checkout',
                path: '/checkout',
                totalSum: total,
                email: req.session.user.email
            });
        });
};
