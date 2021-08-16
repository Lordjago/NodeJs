const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const User = require('./model/userModel');

const mongoose = require('mongoose');

const app = express();


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

app.use((req, res, next) => {
    next();
});

app.use('/admin', adminRoutes); // /admin was added to make only admin go this route

app.use(shopRoutes);

app.use('/', errorController.get404);

app.use((req, res, next) => {
    User.findById("6119537b13ff4f1ea48126fe")
    .then(user => {
        console.log(user);
        req.user = user;
        next();
    })
    .catch(err => {
        console.log(err);
    })
})

const port = process.env.PORT || 3000;

// mongoConnect(() => {
//     app.listen(port, console.log(`App Listening on ${port}`));
// });
mongoose
    .connect('mongodb+srv://root:root@clustertest.adfbz.mongodb.net/Shop?retryWrites=true&w=majority')
    .then((result) => {
        User.findOne().then(user => {
            if(!user) {
            const user = new User({
            'name': "Max",
            'email': "test@test.com",
            'cart': {
                items: []
            }
        });
        user.save();
            }
        }) 
        app.listen(port, console.log(`App Listening on ${port}`));
    })
    .catch((err) => {
        console.log(err);
    });
// app.listen(port, console.log(`App Listening on ${port}`));
