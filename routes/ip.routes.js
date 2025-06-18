// routes/ip.routes.js
const express = require('express');
const router = express.Router();

const { ipSearch } = require('../controllers/ip.controller');

router.post('/', ipSearch);

module.exports = router;
