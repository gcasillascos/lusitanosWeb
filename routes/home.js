const express = require('express');
// const homeController = require('../controllers/home');
const {home, formato, reglamento} = require('../controllers/home');
const router = express.Router();

router.get('/',home);
router.get('/formato',formato);
router.get('/reglamento',reglamento);
module.exports = router;
