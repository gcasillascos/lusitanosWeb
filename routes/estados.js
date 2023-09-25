const express = require('express');
const {
  ganaderia,
  ganaderiamodal,
  horsesNew,
  horsesUpdate,
  horsesDelete,
} = require('../controllers/estados');
const router = express.Router();
const redirectIfAuthMiddleware = require('../middleware/redirectIfAuthMiddleware');

router
  .get('/ganaderia', redirectIfAuthMiddleware, ganaderia)
  .get('/ganaderiamodal/:ownerId/:id', redirectIfAuthMiddleware, ganaderiamodal)
  .post('/horsesregister', horsesNew)
  .post('/horsesupdate/:id', horsesUpdate)
  .post('/horsesdelete/:id', horsesDelete);
module.exports = router;