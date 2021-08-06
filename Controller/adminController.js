const Product = require('../model/productModel');

// const products = [];
//Admin Add Product
exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: "/admin/add-product"
    });
};

//Admin getting product list
exports.getAdminProductList = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/admin/product-list',
            hasProducts: products.length > 0
        });

    });
};

//Admin Post 
exports.postAddProduct = (req, res) => {
    // const product = req.body.title;
    // products.push({ title: product });
    // res.send(products);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(null, title,  price,  description, imageUrl);
    product
    .save()
    .then(() => {
        res.redirect('/');
    })
    .catch(err => console.log(err));

    // product.save();
    // console.log(product);
    // res.redirect('/');

};