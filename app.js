const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const db = require('./util/database');

const app = express();


// app.engine('hbs', expressHbs());
//Displaying Dynamic content
app.set('view engine', 'ejs');

app.set('views', 'public');

// const adminData = require('./routes/admin');
const adminRoutes = require('./routes/admin');

const shopRoutes = require('./routes/shop');

const errorController = require('./Controller/error');

app.use(bodyParser.urlencoded( {extended: false} ));

app.use(express.static(path.join(__dirname, 'public'))); //serving file statically, it was used to serve css and js

// app.use('/admin', adminData.routes);

app.use('/admin', adminRoutes); // /admin was added to make only admin go this route

app.use(shopRoutes);

app.use('/', errorController.get404);


// app.use((req, res, next) => {
//     console.log("inside middleware");
//     next(); //Allows request to continue to another middleware
// });


//listen in express js also create an htttp for us
// so we can remove createServer and the http the one at the top or the one in server.js 
//if we are working with express js in it
const port = process.env.PORT || 3000;
app.listen(port, console.log(`App Listening on ${port}`));