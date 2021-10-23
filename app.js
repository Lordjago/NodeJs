const express = require('express');

const path = require('path');

const fs = require('fs');

const csrf = require('csurf');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const config = require('./config');

const session = require('express-session');

const multer = require('multer');

const helmet = require('helmet')

const compression = require('compression')

const morgan = require('morgan')

const flash = require('connect-flash');

const mongoDBStore = require('connect-mongodb-session')(session);

const MONGODB_URI = config.mongodb_uri;

const app = express();

const csrfProtection = csrf();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    } ,
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const store = new mongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});



app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }));

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'))

//serving file statically, it was used to serve css and js
app.use(express.static(path.join(__dirname, 'public')));

app.use('/images', express.static(path.join(__dirname, 'images')));

//Displaying Dynamic content
app.set('view engine', 'ejs');

app.set('views', 'public');

// const adminData = require('./routes/admin');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})


app.use(helmet())

app.use(compression())

app.use(morgan('combined', {stream: accessLogStream}))

const adminRoutes = require('./routes/admin');

// const shopRoutes = require('./routes/shop');

// const transactionRoutes = require('./routes/transaction');

// const authRoutes = require('./routes/auth');

// const errorController = require('./controller/error');


// using session
app.use(session({
    secret: 'My Secret', 
    resave: false, 
    saveUninitialized: false, 
    store: store
})) 

//Adding informmation that should follow evvery single mages 
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn,
    res.locals.csrfToken = req.csrfToken;
    next();
})

app.use(flash())

// app.use('/admin', adminRoutes); //admin was added to make only admin go this route

// app.use(shopRoutes);

// app.use(transactionRoutes);

// app.use(authRoutes);

// app.use(csrfProtection);

// app.use('/500', errorController.get500)

// app.use('/', errorController.get404);

// app.use((error, req, res, next) => {
//     res.redirect('/500')
// })

const port = process.env.PORT || 3000;

// mongoConnect(() => {
//     app.listen(port, console.log(`App Listening on ${port}`));
// });
mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then((result) => {
        console.log("Database Connected Successfull");
        app.listen(port, console.log(`Server up and running on port: {${port}}`));
    })
    .catch((err) => {
        console.log(err);
    });
// app.listen(port, console.log(`App Listening on ${port}`));
