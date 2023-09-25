const express = require('express');
const {
  arbol,
  arbolx,
  arbolmodal,

} = require('../controllers/pedigrees');
const router = express.Router();
const redirectIfAuthMiddleware = require('../middleware/redirectIfAuthMiddleware');

router
  .get('/arbol', arbol)
  .post('/arbolx', arbolx)
  .get('/arbolmodal/:ownerId/:id', arbolmodal);
/*   .post('/ownersregister', ownersNew)
  .post('/ownersupdate/:id', ownersUpdate)
  .post('/ownersdelete/:id', ownersDelete) */
module.exports = router;
