// Static Router is used for the frontend routes

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    return res.render('home');
})

module.exports = router;