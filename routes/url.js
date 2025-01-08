const express = require('express');
const { generateShortUrl, GetAnalytics } = require('../controllers/url');
const router = express.Router();

router.post('/', generateShortUrl);

router.get('/analytics/:shortId', GetAnalytics);

module.exports = router;