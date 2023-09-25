const express = require('express');
const {
  login,
  loginx,
  updatepwd,
  forgotpwd,
  forgotpwdx,
  updateinfo,
  managefa,
  faverify,
  fadisable,
  disablefax,
  logout,
  resetpwd,
  resetpwdx,
  register,
} = require('../controllers/auth');
const router = express.Router();

router
  .get('/login', login)
  .post('/loginx', loginx)
  .get('/updatepwd', updatepwd)
  .get('/updateinfo', updateinfo)
  .get('/managefa', managefa)
  .get('/disablefa', fadisable)
  .post('/disablefax', disablefax)
  .post('/faverify', faverify)
  .get('/logout', logout)
  .get('/resetpassword/:resettoken', resetpwd)
  .post('/resetpwdx', resetpwdx)
  .get('/forgotpwd', forgotpwd)
  .post('/forgotpwdx', forgotpwdx)
  .get('/register', register);
module.exports = router;
