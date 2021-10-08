const bcrypt = require('bcryptjs');

const User = require('../model/userModel');

exports.getLogin = (req, res, next) => {
//    const isLoggedIn = req.get('Cookie').split(';')[1].trim().split('=')[1];
// console.log(req.session.isLoggedIn);
            res.render('auth/login', {
                pageTitle: 'Login',
                path: '/login',
                isLoggedIn: isLoggedIn = false,
                errorMessage: req.flash('error')
            });
        
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    
    console.log(email)
    console.log(password)
    User.findOne({email: email})
    .then((user) => {
        if(!user) {
            req.flash('error', "Invalid Email")
            return res.redirect('/login');
        }
        bcrypt.compare(password, user.password)
        .then((doMatch) => {
            if(doMatch) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save((err) => {
                    // console.log(err);
                    req.session.user = user;
                    console.log(req.session.user );
                    res.redirect('/');
                });
            }
            req.flash('error', "Invalid Password")
            res.redirect('/login');
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/login');
        })
    })
        .catch((err) => {
            console.log(err);
            res.redirect('/login');
        });


    // User.findById("6119537b13ff4f1ea48126fe")
    //     .then(user => {
    //         req.session.isLoggedIn = true;
    //         req.session.user = user;
    //         req.session.save((err) => {
    //             console.log(err);
    //             res.redirect('/');
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })

};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        pageTitle: 'Signup',
        path: '/signup',
        isLoggedIn: isLoggedIn = false,
        errorMessage: req.flash('error')
    });

};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;

    User.findOne({email: email})
    .then((userDoc) => {
        if (userDoc) {
            req.flash('error', "Email already exist, Please provide a another one")
            return res.redirect('/signup');
        }
       return hashedPassword = bcrypt.hash(password, 12)
       .then((hashedPassword) => {
        const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
        });
        user.save();
    })
    .then((result) => {
        console.log('Reg Success');
        res.redirect('/login');
    })
})    
    .catch((err) => {
        console.log(err);
    });


};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    })
    // User.findById("6119537b13ff4f1ea48126fe")
    //     .then(user => {
    //         req.session.isLoggedIn = true;
    //         req.session.user = user;
    //         res.redirect('/');
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })

};