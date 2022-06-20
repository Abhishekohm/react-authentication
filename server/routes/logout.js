const express = require('express');
const router = express.Router();
const { logout } = require('../controllers/logout');

router.route('/').get(logout)

module.exports = router;