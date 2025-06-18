// routes/email.routes.js
const express = require('express');
const router = express.Router();

const { emailSearch } = require('../controllers/email.controller');

router.post('/', emailSearch);

module.exports = router;
