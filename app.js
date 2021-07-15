const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const app = express();

const adminData = require('./routes/admin');

const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded( {extended: false} ));

app.use(express.static(path.join(__dirname, 'public'))); //serving file statically, it was used to serve css and js

app.use('/admin',adminData.routes); // /admin was added to make only admin go this route

app.use(shopRoutes);

app.use('/',(req, res, next) => {
   res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});


// app.use((req, res, next) => {
//     console.log("inside middleware");
//     next(); //Allows request to continue to another middleware
// });


//listen in express js also create an htttp for us
// so we can remove createServer and the http the one at the top or the one in server.js 
//if we are working with express js in it
app.listen(3000);