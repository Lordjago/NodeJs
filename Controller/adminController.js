const Product = require('../model/productModel');


// const products = [];
//Admin Add Product
exports.getAddProduct = (req, res) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: "/admin/add-product",
        editing: false,
        isLoggedIn: req.session.isLoggedIn
    });
};

//Admin getting product list
exports.getAdminProductList = (req, res) => {
    Product.find()
    .then((products) => {
        res.render('admin/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/admin/product-list',
            hasProducts: products.length > 0,
            isLoggedIn: req.session.isLoggedIn
        });
    })
    .catch(err => {
        console.log(err);
    });
    
};

//Admin Post 
exports.postAddProduct = (req, res) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product({
        title: title,
        price: price, 
        description: description,
        imageUrl: imageUrl,
        userId: req.session.user
        // userId: '6119537b13ff4f1ea48126fe'
    });
    product
    .save()
    .then(result => {
        console.log('Product created');
        console.log(result);
        res.redirect('/admin/product-list');
    })
    .catch((err) =>{
         console.log(err)
        });
    
     

};

exports.getEditProduct = (req, res) => {
    const editMode = req.query.edit;
    if(!editMode){
       return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then((product) => {
        if(!product){
            res.redirect('/');
        }
        res.render('admin/edit-product', {
        product: product,
        pageTitle: 'Edit Product',
        path: "/admin/edit-product",
            editing: editMode,
            isLoggedIn: req.session.isLoggedIn
    });
    }). catch(err => {
        console.log(err);
    });
    
};

exports.postEditProduct = (req, res) => {
    const prodId = req.body.productId;
    const updatedtitle = req.body.title;
    const updatedimageUrl = req.body.imageUrl;
    const updatedprice = req.body.price;
    const updateddescription = req.body.description;

    Product.findById(prodId)
    .then((product) => {
        product.title = updatedtitle;
        product.price = updatedprice;
        product.description = updateddescription.trim();
        product.imageUrl = updatedimageUrl;
        return product.save()
    })
    .then(product => {
        console.log(product);
                console.log('UPDATED PRODUCT');
                res.redirect('/admin/product-list');
            })
    .catch(err => {
            console.log(err);
        });
    
};

exports.postDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    // console.log(prodId);
    Product.findByIdAndRemove(prodId)
        .then(result => {
            console.log('PRODUCT DESTROYED');
            res.redirect('/admin/product-list');
        })
        .catch(err => {
            console.log(err);
        })
}