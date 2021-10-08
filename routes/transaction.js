require('express-router-group')

const express = require('express');

const router = express.Router();

const isAuth = require('../middleware/is-auth')

const transactContoller = require('../controller/transaction')

router.group('/transaction',  (router) => {

    router.post('/initialize', transactContoller.transactInit)

    router.get('/verify/:reference', transactContoller.verifyTransact)

    router.get('/', transactContoller.getTransact)

    router.get('/:id', transactContoller.transactById)
})

module.exports = router