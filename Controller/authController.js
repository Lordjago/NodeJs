const User = require('../model/userModel');

exports.getLogin = (req, res, next) => {
//    const isLoggedIn = req.get('Cookie').split(';')[1].trim().split('=')[1];
console.log(req.session.isLoggedIn);
            res.render('auth/login', {
                pageTitle: 'Login',
                path: '/login',
                isLoggedIn: isLoggedIn = false
            });
        
};

exports.postLogin = (req, res, next) => {
    User.findById("6119537b13ff4f1ea48126fe")
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        })

};