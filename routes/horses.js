const express = require('express');
const {
  horse,
  horsemodal,
  horsesNew,
  horsesUpdate,
  horsesDelete,
horsesSanitariosNew,
horsesSanitariosUpdate,
horsesSanitariosDelete,
horsesNutricionalesNew,
horsesNutricionalesUpdate,
horsesNutricionalesDelete,
horsesPremiosNew,
horsesPremiosUpdate,
horsesPremiosDelete,
horsesValoracionNew,
horsesValoracionUpdate,
horsesValoracionDelete,

} = require('../controllers/horses');



const router = express.Router();
const redirectIfAuthMiddleware = require('../middleware/redirectIfAuthMiddleware');

router
  .get('/horse', redirectIfAuthMiddleware, horse)
  .get('/horsesmodal/:ownerId/:id', redirectIfAuthMiddleware, horsemodal)
  .post('/horsesregister', horsesNew)
  .post('/horsesupdate/:id', horsesUpdate)
  .post('/horsesdelete/:id', horsesDelete)
  .post('/:id/sanitarios', horsesSanitariosNew)
  .put('/:id/sanitarios', horsesSanitariosUpdate)
  .delete('/:id/sanitarios', horsesSanitariosDelete)
  .post('/:id/nutricionales', horsesNutricionalesNew)
  .put('/:id/nutricionales', horsesNutricionalesUpdate)
  .delete('/:id/nutricionales', horsesNutricionalesDelete)
  .post('/:id/premios', horsesPremiosNew)
  .put('/:id/premios', horsesPremiosUpdate)
  .delete('/:id/premios', horsesPremiosDelete)


module.exports = router;
