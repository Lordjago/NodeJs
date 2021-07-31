const fs = require('fs');

fs.readFile('./data/text.json', 'utf-8', (err, dataFromfile) => {
    
    if (err) {
        console.log(err);
    } else {
        try {
            const data = JSON.parse(dataFromfile);
            console.log(data[0].address);
        } catch (err) {
            console.log('Error loading JSON', err)
        }
    }
   
});

const newOb = {
    "name": 'date',
    "password": 'Good'
} ;

let product = [];
product.push(newOb);
fs.writeFile('./data/text.json', JSON.stringify(product, null, 2), err => {
    if (err) {
        console.log(err);
    } else {
        console.log("Success");
    }
});