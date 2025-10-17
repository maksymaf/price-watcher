const express = require('express');
const ScrapeController = require('../controllers/scrapeController');
const router = express.Router();

router.get('/', ScrapeController.scrapeProduct);

module.exports = router;