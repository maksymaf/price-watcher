const express = require('express');
const TrackController = require('../controllers/trackController');
const router = express.Router();

router.post('/', TrackController.trackProduct);

module.exports = router;
