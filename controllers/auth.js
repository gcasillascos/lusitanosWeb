const fs = require('fs');
const path = require('path');
const flash = require('connect-flash');
const asyncHandler = require('../middleware/async');
const axios = require('axios');

// @desc      User login
// @route     GET /auth/login
// @access    Public
exports.login = asyncHandler(async (req, res) => {
  const errors = null;
  res.render('./auth/login', { errors });
});

// @desc      User Update Password
// @route     GET /auth/updatepwd
// @access    Private/Admin
exports.updatepwd = asyncHandler(async (req, res) => {
  const errors = null;
  const success = null;
  res.render('./auth/updatepwd', { success, errors });
});

// @desc      User forgot Password
// @route     GET /auth/forgotpwd
// @access    Public
exports.forgotpwd = asyncHandler(async (req, res) => {
  const errors = null;
  const success = null;
  res.render('./auth/forgotpwd', { success, errors });
});

// @desc      Update User Info
// @route     GET /auth/updateinfo
// @access    Private
exports.updateinfo = asyncHandler(async (req, res) => {
  res.render('./auth/updateinfo');
});

// @desc      Activate/ 2FA
// @route     GET /auth/managefa
// @access    Private
exports.managefa = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const errors = null;
  const success = null;

  let config = {
    method: 'post',
    url: `${baseurl}/api/v1/auth/faregister`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
    data: { userId },
  };

  await axios(config)
    .then((response) => {
      const js = response.data;
      console.log(js);
      req.flash('respuesta', js);
      res.render('./auth/managefa', {
        success: null,
        errors: null,
        js,
      });
    })
    .catch((err) => {
      console.log(err.response.data);

      valError = err.response.data.error;
      res.render('./auth/managefa', { errors: valError, success: null });
    });
});

// @desc      Verify 2FA
// @route     GET /auth/verifyfa
// @access    Private
exports.faverify = asyncHandler(async (req, res) => {
  const { totp } = req.body;
  let errors = null;
  let success = null;
  const datos = req.flash('respuesta')[0];

  let config = {
    method: 'post',
    url: `${baseurl}/api/v1/auth/faverify`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
    data: { totp },
  };

  await axios(config)
    .then((response) => {
      let js = response.data;
      console.log(js);
      if (typeof datos != 'undefined') {
        (js.data = datos.data), (js.qrcode = datos.qrcode);
      }
      success = 'Your MFA is active and verified';
      res.render('./auth/managefa', {
        success,
        errors: null,
        js,
      });
    })
    .catch((err) => {
      console.log(err.response.data);

      valError = err.response.data.error;
      res.render('./auth/managefa', { errors: valError, success: null, js });
    });
});

// @desc      Disable 2FA
// @route     GET /auth/disablefa
// @access    Private
exports.fadisable = asyncHandler(async (req, res) => {
  const errors = null;
  const success = null;
  res.render('./auth/disablefa', { success, errors });
});

// @desc      Disable/ 2FA
// @route     GET /auth/disablefax
// @access    Private
exports.disablefax = asyncHandler(async (req, res) => {
  const { totp, password } = req.body;
  const errors = null;
  const success = null;

  let config = {
    method: 'post',
    url: `${baseurl}/api/v1/auth/validatepwd`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
    data: { password },
  };

  await axios(config)
    .then((response) => {
      const js = response.data;
      console.log(js);

      if (js.data) {
        let config = {
          method: 'post',
          url: `${baseurl}/api/v1/auth/favalidate`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.session.token}`,
          },
          data: { totp },
        };

        axios(config)
          .then((response) => {
            const js = response.data;
            console.log(js);

            if (js.data) {
              let config = {
                method: 'post',
                url: `${baseurl}/api/v1/auth/fadisable`,
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${req.session.token}`,
                },
              };

              axios(config)
                .then((response) => {
                  success = 'MFA disable';

                  res.render('./auth/disablefa', {
                    errors: null,
                    success,
                  });
                })
                .catch((err) => {
                  res.render('./auth/disablefa', {
                    errors: 'Invalid Credentials',
                    success: null,
                  });
                });
            } else {
              errors = 'Invalid Credetials';
              res.render('./auth/disablefa', {
                success: null,
                errors,
                js,
              });
            }
          })
          .catch((err) => {
            console.log(err.response.data);

            valError = err.response.data.error;
            res.render('./auth/disablefa', { errors: valError, success: null });
          });
      } else {
        errors = 'Invalid Credetials';
        res.render('./auth/disablefa', {
          success: null,
          errors: null,
          js,
        });
      }
    })
    .catch((err) => {
      console.log(err.response.data);

      valError = err.response.data.error;
      res.render('./auth/disablefa', { errors: valError, success: null });
    });
});

// @desc      User logout
// @route     GET /auth/logout
// @access    Private
exports.logout = asyncHandler(async (req, res) => {
  req.session.destroy(() => {
    //req.session.userId = '';
    userData = null;
    console.log('userData', userData, req.session)
    res.redirect('/');
  });
});

// @desc      Password Reset
// @route     GET /auth/resetpwd/:token
// @access    Public
exports.resetpwd = asyncHandler(async (req, res) => {
  const errors = null;
  const success = null;
  resettoken = req.params.resettoken;
  res.render('./auth/resetpwd', { success, errors });
});

// @desc      Reset Password
// @route     PUT /users/resetpwdx
// @access    Private
exports.resetpwdx = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;
  let valError = null;
  let valSuccess = null;
  console.log(newPassword);

  let config = {
    method: 'put',
    url: `${baseurl}/api/v1/auth/resetpassword/${resettoken}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: { newPassword },
  };

  await axios(config)
    .then((response) => {
      const js = response.data;
      console.log(js);
      userData = js;
      valSuccess = 'Your password has been changed successfully';
      res.render('./auth/resetpwd', { success: valSuccess, errors: null });
      console.log(req.session.token + ' ' + req.sessionID);
    })
    .catch((err) => {
      console.log(err.response.data);

      valError = err.response.data.error;
      res.render('./auth/resetpwd', { errors: valError, success: null });
    });
});

// @desc      Forgot Password
// @route     PUT /auth/forgotpwd
// @access    Private
exports.forgotpwdx = asyncHandler(async (req, res) => {
  const { email } = req.body;
  let valError = null;
  let valSuccess = null;
  console.log(email);

  let config = {
    method: 'post',
    url: `${baseurl}/api/v1/auth/forgotpassword`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: { email, hostWeb: req.get('host') },
  };

  await axios(config)
    .then((response) => {
      const js = response.data;
      console.log(js);

      valSuccess = js.data;
      res.render('./auth/forgotpwd', { success: valSuccess, errors: null });
      console.log(req.session.token + ' ' + req.sessionID);
    })
    .catch((err) => {
      console.log(err.response.data);

      valError = err.response.data.error;
      res.render('./auth/forgotpwd', { errors: valError, success: null });
    });
});

// @desc      register
// @route     GET /auth/reregister
// @access    Public
exports.register = asyncHandler(async (req, res) => {
  const errors = null;
  const success = null;
  const username = '';
  const email = '';
  const password = '';
  const ganaderia = '';
  const role = '';
  const password2 = '';
  res.render('./register', {
    success,
    errors,
    username,
    email,
    password,
    ganaderia,
    role,
  });
});

// @desc      User login
// @route     POST /auth/login
// @access    Public
exports.loginx = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  let valError = null;
  console.log(email, password);

  let config = {
    method: 'post', //http://localhost:4500/api/v1/auth/login
    url: `${baseurl}/api/v1/auth/login`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: { email: email, password: password },
  };

  await axios(config)
    .then((response) => {
      // const js = JSON.stringify(response.data);
      const js = response.data;
      console.log("js", js);
      req.session.userId = js.user._id;
      req.session.token = js.token;
      req.session.name = js.user.name;
      req.session.owner = js.user.owner;
      req.session.role = js.user.role;
      req.session.isTwoFactorEnable = js.user.isTwoFactorEnable;
      req.session.isEmailConfirmed = js.user.isEmailConfirmed;
      console.log("userdata",userData)
      userData = js;
      console.log("userd", userData)
      res.redirect('/');
      console.log(req.session.token + ' ' + req.sessionID +  + userData);
    })
    .catch((err) => {
      console.log(err.code);

      valError = err.code;
      req.flash('valError', valError);
      req.session.userId = null;
      res.render('./auth/login', { errors: valError });
    });
});

// @desc      Update Password
// @route     PUT /auth/updatepwd
// @access    Private
exports.updatepwdx = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  let valError = null;
  let valSuccess = null;
  console.log(currentPassword, newPassword);

  let config = {
    method: 'put',
    url: `${baseurl}/api/v1/auth/updatepassword`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
    data: { currentPassword, newPassword },
  };

  await axios(config)
    .then((response) => {
      const js = response.data;
      console.log(js);
      req.session.userId = js.user._id;
      req.session.token = js.token;
      userData = js;
      valSuccess = 'Your password has been changed successfully';
      res.render('./auth/updatepwd', { success: valSuccess, errors: null });
      console.log(req.session.token + ' ' + req.sessionID);
    })
    .catch((err) => {
      console.log(err.response.data);

      valError = err.response.data.error;
      res.render('./auth/updatepwd', { errors: valError, success: null });
    });
});
