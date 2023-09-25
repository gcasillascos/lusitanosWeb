const fs = require('fs');
const path = require('path');
const flash = require('connect-flash');
const asyncHandler = require('../middleware/async');
const axios = require('axios');

// @desc      Users display
// @route     GET /user/login
// @access    Public
exports.user = asyncHandler(async (req, res) => {
  let ganadero = null;
  let urlax = null;

  if (userData.user.role !== 'admin') {
    urlax = `api/v1/users/${userData.user.owner}`;
  } else {
    urlax = `api/v1/users`;
  }

  const config = {
    method: 'get',
    url: `${baseurl}/${urlax}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
  };

  await axios(config)
    .then((response) => {
      const data = response.data;
      console.log(data);
      
      res.render('./users/users', { data: JSON.stringify(data) });
    })
    .catch((err) => {
      console.log(err.response.data);

      res.render('./users/users', {});
    });
});

// @desc
// @route     GET /owner/usermodal
// @access    Public
exports.usermodal = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (id === '0') {
    let data = {
      email: null,
      name: null,
      owner: null,
      role: null,
      farm: null,
    };
    res.render('./users/usersmodal', { data, id });
  } else {
    const config = {
      method: 'get',
      url: `${baseurl}/api/v1/users/${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${req.session.token}`,
      },
    };

    await axios(config)
      .then((response) => {
        let data = response.data.data;
        console.log(data);

        res.render('./users/usersmodal', { data , id });
      })
      .catch((err) => {
        console.log(err.response.data);

        res.render('.users/usersmodal', { data, id });
      });
  }
});

// @desc      Registrnado un nuewvo Ganadero
// @route     GET /owner/ownernew
// @access    Public
exports.usersNew = asyncHandler(async (req, res) => {
  const newOwner = req.body;
  let id = newOwner._id;
  let salute = newOwner.salutation;
  newOwner._id = id.toUpperCase();
  newOwner.salutation = `${salute[0].toUpperCase()}${salute.slice(1)}`;
  req.flash('nuevo', newOwner);
  const errors = null;
  const success = null;

  const config = {
    method: 'POST',
    url: `${baseurl}/api/v1/owners`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
    data: newOwner,
  };

  await axios(config)
    .then((response) => {
      const data = response.data;
      data.msg = `Registro ${data.data._id}, creado correctamente`;
      console.log(data);
      const id = '0';
      res.json(data);
    })
    .catch((err) => {
      console.log(err.response.data);
      const id = '0';
      valError = err.response.data.error;
      res.json(err.response.data);
    });
});

// @desc      Registrnado un nuewvo Ganadero
// @route     GET /owner/register
// @access    Public
exports.register = asyncHandler(async (req, res) => {
  const newOwner = req.body;

  const id = req.params.id;
  const errors = null;
  const success = null;

  const config = {
    method: 'get',
    url: `${baseurl}/api/v1/owners/${id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
  };

  await axios(config)
    .then((response) => {
      const data = response.data.data;
      console.log(data);

      res.render('./ownersmodal', { success, errors, data });
    })
    .catch((err) => {
      console.log(err.response.data);

      valError = err.response.data.error;
      res.render('./ownersmodal', { errors: valError, success: null });
    });
});

// @desc      Update an Owner
// @route     GET /owner/ownerupdate7:_id
// @access    Public
exports.usersUpdate = asyncHandler(async (req, res) => {
  const newOwner = req.body;
  const id = req.params.id;
  delete newOwner._id;

  const config = {
    method: 'PUT',
    url: `${baseurl}/api/v1/owners/${id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
    data: newOwner,
  };

  await axios(config)
    .then((response) => {
      const data = response.data;
      data.msg = `Registro ${data.data._id}, modificado correctamente`;
      console.log(data);

      res.json(data);
    })
    .catch((err) => {
      console.log(err.response.data);
      res.json(err.response.data);
    });
});

// @desc      delete an Owner
// @route     POST /owner/ownerdelete
// @access    Private
exports.usersDelete = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const config = {
    method: 'DELETE',
    url: `${baseurl}/api/v1/owners/${id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
  };

  await axios(config)
    .then((response) => {
      const data = response.data;
      data.msg = `Registro ${data.data._id}, eliminado correctamente`;
      console.log(data);

      res.json(data);
    })
    .catch((err) => {
      console.log(err.response.data);
      res.json(err.response.data);
    });
});
