const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const sequelize = require('./util/database');

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

sequelize
    .sync()
    .then(result => {
        // console.log(result);
        app.listen(port, console.log(`App Listening on ${port}`));
    })
    .catch(err => console.log(err));
const port = process.env.PORT || 3000;
