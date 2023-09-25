const express = require('express');
const {
  general,
  repCaballo
} = require('../controllers/reportes');
const router = express.Router();
const redirectIfAuthMiddleware = require('../middleware/redirectIfAuthMiddleware');

router
  .get('/general', redirectIfAuthMiddleware, general)
  .get('/caballos/:id', repCaballo),
module.exports = router;
