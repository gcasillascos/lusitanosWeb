const express = require('express');
const {
  preRegistro,
  agregaPreRegistro,
  preRegistroModal,
  valuacion,
  valuacionModal,
  fertilidad,
  fertilidadModal,
//   horsesNew,
//   horsesUpdate,
//   horsesDelete,
} = require('../controllers/formatos');
const router = express.Router();
const redirectIfAuthMiddleware = require('../middleware/redirectIfAuthMiddleware');

router
  .route('/preregistro')
  .get( redirectIfAuthMiddleware, preRegistro)
  .post(redirectIfAuthMiddleware, agregaPreRegistro);

router
  .get('/preregistromodal/:ownerId/:id', redirectIfAuthMiddleware, preRegistroModal)
  .get('/valoraciones',redirectIfAuthMiddleware, valuacion)
  .get('/valoracionesmodal/:ownerId/:id', redirectIfAuthMiddleware, valuacionModal)
  .get('/fertilidad',redirectIfAuthMiddleware, fertilidad)
  .get('/fertilidadmodal/:ownerId/:id', redirectIfAuthMiddleware, fertilidadModal)
//   .post('/horsesregister', horsesNew)
//   .post('/horsesupdate/:id', horsesUpdate)
//   .post('/horsesdelete/:id', horsesDelete);

module.exports = router;
