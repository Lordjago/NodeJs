// const products = []; // Storing Data in Array
//Storing data suing file system
const fs = require('fs');

const path = require('path');

const PATH_ = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'product.json'
);

const getProductsFromFile = callback => {
    fs.readFile(PATH_, (err, fileContent) => {
        if (err) {
            callback([]);
        }else{
        callback(JSON.parse(fileContent));
        }
    })
}

module.exports = class Products {
    constructor(name){
        this.title = name;
    }

    save(){
        // products.push(this);
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
}