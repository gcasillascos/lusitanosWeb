const express = require('express');
const {
  owner,
  ownermodal,
  ownerDir,
  ownerDirModal,
  ownersNew,
  ownersUpdate,
  ownersDelete,
} = require('../controllers/owners');
const router = express.Router();
const redirectIfAuthMiddleware = require('../middleware/redirectIfAuthMiddleware');

router
  .get('/owner', redirectIfAuthMiddleware, owner)
  .get('/ownermodal/:id', redirectIfAuthMiddleware, ownermodal)
  .get('/ownerdir', ownerDir)
  .get('/ownerdirmodal/:id',  ownerDirModal)
  .post('/ownersregister', ownersNew)
  .post('/ownersupdate/:id', ownersUpdate)
  .post('/ownersdelete/:id', ownersDelete);
module.exports = router;
