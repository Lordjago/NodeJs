const express = require('express');

const path = require('path');

const rootDir = require('../util/path');

const router = express.Router();

//slash route
router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'public', 'index.html'));
});

module.exports = router;