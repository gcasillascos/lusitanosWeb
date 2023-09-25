const express = require('express');
const {
  cubricion,
  cubricionmodal,
  cubricionNew,
  cubricionUpdate,
  cubricionDelete,
} = require('../controllers/cubriciones')
const router = express.Router();
const redirectIfAuthMiddleware = require('../middleware/redirectIfAuthMiddleware');

router
  .get('/cubricion', redirectIfAuthMiddleware, cubricion)
  .get('/cubricionmodal/:id/:owner', redirectIfAuthMiddleware, cubricionmodal)
  .post('/cubricionregister', cubricionNew)
  .post('/cubricionupdate/:id', cubricionUpdate)
  .post('/cubriciondelete/:id', cubricionDelete);
module.exports = router;
