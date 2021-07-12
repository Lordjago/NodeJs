const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');

const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded( {extended: false} ));

app.use(adminRoutes);

app.use(shopRoutes);

app.use('/',(req, res, next) => {
   res.status(404).send("<h1>Page not Found!<h1/>");
});


// app.use((req, res, next) => {
//     console.log("inside middleware");
//     next(); //Allows request to continue to another middleware
// });


//listen in express js also create an htttp for us
// so we can remove createServer and the http the one at the top or the one in server.js 
//if we are working with express js in it
app.listen(3000);