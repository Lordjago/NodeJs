const Product = require('../model/productModel');
const { validationResult } = require('express-validator/check');
const fileHelper = require('../util/file')
const ITEMS_PER_PAGE = 4


// const products = [];
//Admin Add Product
getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: "/admin/add-product",
        editing: false,
        errorMessage: null,
        isLoggedIn: req.session.isLoggedIn
    });
};

//Admin getting product list
getAdminProductList = (req, res, next) => {
    const page = +req.query.page || 1
    let totalItems;
    Product.find({ userId: req.session.user._id})
        .countDocuments()
        .then((numProduct) => {
            totalItems = numProduct;
            return Product.find({ userId: req.session.user._id })
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
        })
        .then(products => {
            // console.log(products);
            res.render('admin/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/admin/product-list',
                hasProducts: products.length > 0,
                currentPage: page,
                hasNextPage: ITEMS_PER_PAGE * page < totalItems,
                hasPrevious: page > 1,
                nextPage: page + 1,
                prevPage: page - 1,
                lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
            });
        })

    .catch((err) =>{
         const error = new Error(err);
         error.httpStatusCode =  500
         return next(error);
    });
    
};

//Admin Post 
postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const image = req.file;
    const price = req.body.price;
    const description = req.body.description;

    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json(error.array())
        // console.log(errors.array());
        // return res.status(422).render('admin/edit-product', {
        //     pageTitle: 'Add Product',
        //     path: '/admin/add-product',
        //     editing: false,
        //     hasError: true,
        //     product: {
        //         title: title,
        //         imageUrl: imageUrl,
        //         price: price,
        //         description: description
        //     },
        //     errorMessage: errors.array()[0].msg
        // });
    }
    if (!image) {
        return res.status(422).render('admin/edit-product', {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            editing: false,
            hasError: true,
            product: {
                title: title,
                price: price,
                description: description
            },
            errorMessage: "File is not an Image"
        });
    }
    const imageUrl = image.path
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
        //  const error = new Error(err);
        //  error.httpStatusCode =  500
        //  return next(error);
        console.log(err);
    });
    
     

};

getEditProduct = (req, res, next) => {
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
        errorMessage: null,
        isLoggedIn: req.session.isLoggedIn
    });
    })
    .catch((err) =>{
         const error = new Error(err);
         error.httpStatusCode =  500
         return next(error);
    });
    
};

postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const image = req.file;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: true,
            product: {
                title: updatedTitle,
                price: updatedPrice,
                description: updatedDescription,
                _id: prodId
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }
    Product.findById(prodId)
    .then((product) => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDescription.trim();
        if(image) {
            fileHelper.deleteFile(product.imageUrl)
            product.imageUrl = image.path;
        }
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

deleteProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then((product) => {
        if(!product) {
            return next(new Error())
        }
        fileHelper.deleteFile(product.imageUrl)
        return Product.findByIdAndRemove(prodId)
    })
        .then(result => {
            console.log('PRODUCT DESTROYED');
            res.status(200).json({message: "Success"})
        })
        .catch(err => {
            res.status(500).json({message: "Deleting product failed"})
        })
}

module.exports = {
    // getAddProduct,
    // getAdminProductList,
    // postAddProduct,
    // getEditProduct,
    // postEditProduct,
    // deleteProduct
}