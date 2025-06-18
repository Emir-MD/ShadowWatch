// routes/googleDorks.routes.js
const express = require('express');
const router = express.Router();

const { googleDorksSearch } = require('../controllers/googleDorks.controller');

router.post('/', googleDorksSearch);

module.exports = router;
