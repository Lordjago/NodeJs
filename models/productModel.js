// const products = []; // Storing Data in Array
//Storing data suing file system
const fs = require('fs');

const path = require('path');

const PATH_ = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = callback => {
    fs.readFile(PATH_, (err, fileContent) => {
        if (err) {
            callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

save(){
    // products.push(this);
    this.id = Math.random().toString();
    getProductsFromFile(products => {
        products.push(this);
        fs.writeFile(PATH_, JSON.stringify(products), (err) => {
            console.log(err);
        });
    });
}

    static fetchAll(callback){
    getProductsFromFile(callback);
}

    static findById(id, callback) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            callback(product);
        });
    }
};