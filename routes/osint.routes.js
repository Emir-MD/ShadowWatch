// routes/osint.routes.js
const express = require('express');
const router = express.Router();

const { keywordSearch } = require('../controllers/osint.controller');

router.post('/keyword', keywordSearch);

module.exports = router;
