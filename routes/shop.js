const express = require('express');

const path = require('path');

const rootDir = require('../util/path');

const router = express.Router();

//const adminData = require('./admin');

//slash route
router.get('/', (req, res, next) => {
   //console.log(adminData.products);
    res.sendFile(path.join(rootDir, 'public', 'index.html'));
});

module.exports = router;