const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const User = require('./model/userModel');

const mongoose = require('mongoose');

const config = require('./config');

const session = require('express-session');

const mongoDBStore = require('connect-mongodb-session')(session);

const MONGODB_URI = config.mongodb_uri;

const app = express();

const store = new mongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});



//Displaying Dynamic content
app.set('view engine', 'ejs');

app.set('views', 'public');

// const adminData = require('./routes/admin');
const adminRoutes = require('./routes/admin');

const shopRoutes = require('./routes/shop');

const authRoutes = require('./routes/auth');

const errorController = require('./Controller/error');

app.use(bodyParser.urlencoded( {extended: false} ));

app.use(express.static(path.join(__dirname, 'public'))); //serving file statically, it was used to serve css and js

app.use(session({secret: 'My Secret', resave: false, saveUninitialized: false, store: store})) // using session

// app.use('/admin', adminData.routes);

app.use((req, res, next) => {
    next();
});

app.use('/admin', adminRoutes); // /admin was added to make only admin go this route

app.use(shopRoutes);

app.use(authRoutes);

app.use('/', errorController.get404);


const port = process.env.PORT || 3000;

// mongoConnect(() => {
//     app.listen(port, console.log(`App Listening on ${port}`));
// });
mongoose
    .connect(MONGODB_URI)
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
