const express = require('express');
const {homeController, formato} = require('../controllers/home');
const router = express.Router();

router.route('/').get(homeController);
router.route('/formato').get(formato);
module.exports = router;
