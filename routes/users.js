const express = require('express');
const { user, usermodal } = require('../controllers/users');
const router = express.Router();
const redirectIfAuthMiddleware = require('../middleware/redirectIfAuthMiddleware');

router
  .get('/user', redirectIfAuthMiddleware, user)
  .get('/usersmodal/:id', usermodal);
//   .post('/ownersregister', ownersNew)
//   .post('/ownersupdate/:id', ownersUpdate)
//   .post('/ownersdelete/:id', ownersDelete);
module.exports = router;
