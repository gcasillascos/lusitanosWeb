const express = require('express');
const {
  baja,
  bajamodal,
//   bajaesNew,
//   bajaesUpdate,
//   bajaseDelete,
} = require('../controllers/bajas');
const router = express.Router();
const redirectIfAuthMiddleware = require('../middleware/redirectIfAuthMiddleware');

router
  .get('/baja', redirectIfAuthMiddleware, baja)
  .get('/bajamodal/:id', redirectIfAuthMiddleware, bajamodal);
//   .post('/bajaesregister', bajaesNew)
//   .post('/bajaesupdate/:id', bajaesUpdate)
//   .post('/bajaesdelete/:id', bajaesDelete);
module.exports = router;
