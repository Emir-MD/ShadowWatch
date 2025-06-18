// routes/domain.routes.js
const express = require('express');
const router = express.Router();

const { domainSearch } = require('../controllers/domain.controller');

router.post('/', domainSearch);

module.exports = router;
