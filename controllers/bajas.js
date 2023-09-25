const fs = require('fs');
const path = require('path');
const flash = require('connect-flash');
const asyncHandler = require('../middleware/async');
const axios = require('axios');

// @desc     Get baja
// @route     GET /horses/horse
// @access    Public
exports.baja = asyncHandler(async (req, res) => {
  const errors = null;
  const success = null;
  let urlax = null;

  if (req.session.role !== 'admin') {
    urlax = `api/v1/owners?_id=${req.session.owner}`;
  } else {
    urlax = `api/v1/owners?country=México`;
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
      const datos = response.data;
      console.log(datos);
      datos.token = req.session.token;

      res.render('./bajas/baja', {
        success,
        errors,
        data: JSON.stringify(datos.data),
      });
    })
    .catch((err) => {
      console.log(err.response.data);

      valError = err.response.data.error;
      res.render('./bajas/baja', { errors: valError, success: null });
    });
});

// @desc
// @route     GET /horse/horsemodal
// @access    Public
exports.bajamodal = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const errors = null;
  const success = null;
  let ganadero = null;
  let urlax = null;

  if (id === '0') {
    let data = {
      _id: '',
      lastName: '',
      firstName: '',
      salutation: '',
      farm: '',
      street: '',
      city: '',
      state: '',
      country: ''
    };
    res.render('./bajas/bajamodal', { success, errors, data: JSON.stringify(data), id });
  } else {
    const config = {
      method: 'get',
      url: `${baseurl}/api/v1/horses/${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${req.session.token}`,
      },
    };

    await axios(config)
      .then((response) => {
        let data = response.data.data;
        console.log(data);

        res.render('./bajas/bajasmodal', { success, errors, data, id });
      })
      .catch((err) => {
        console.log(err.response.data);

        valError = err.response.data.error;
        res.render('./bajas/bajasmodal', { errors: valError, success: null });
      });
  }
});
