const express = require('express');
const router = express.Router();
const { handleConvert } = require('../controllers/convertController');
const upload = require('../middleware/upload');

// POST /api/convert - accepts multiple images and returns a PDF
router.post('/', upload.array('images', 20), handleConvert);

module.exports = router;
