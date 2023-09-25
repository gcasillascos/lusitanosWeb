const express = require('express');
const {
  cuentasConc,
  cuentasConcModal,
} = require('../controllers/cuentas');
const router = express.Router();
const redirectIfAuthMiddleware = require('../middleware/redirectIfAuthMiddleware');

router
  .get('/conceptos', cuentasConc)
  .get('/conceptosmodal/:id',  cuentasConcModal)
module.exports = router;
