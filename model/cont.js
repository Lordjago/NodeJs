const fs = require('fs');

const path = require('path');

const PATH_ = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'car.json'
);
module.exports = class Cart {
    static addProduct(id, price){
        fs.readFile(PATH_, (err, fileContent) => {
            let cart = {products: [], tPrice: 0 };
            if (!err) {
                JSON.parse(fileContent);
            }
            //Grab the index of a product if it exi
        const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
       
        //Find exsiting product
        const existingProduct = cart.products[existingProductIndex];
        let updatedProduct;

        if (existingProduct) {
            updatedProduct = { ...existingProduct };
            updatedProduct.qty = updatedProduct.qty + 1;
            cart.products = { ...cart.products };
            cart.products[existingProductIndex] = updatedProduct;
            
        } else {
            //If not exist create new
            updatedProduct = { id: id, qty: 1 };
            cart.products = [...cart.products, updatedProduct];
        }
        cart.tPrice = cart.tPrice + +price;
        fs.writeFile(PATH_, JSON.stringify(cart,null, 2), err => {
            console.log(err);
        });
    });
    }
};