const fs = require('fs');
const path = require('path');
const flash = require('connect-flash');
const asyncHandler = require('../middleware/async');
const axios = require('axios');

// @desc     Get horse
// @route     GET /horses/horse
// @access    Public
exports.ganaderia = asyncHandler(async (req, res) => {
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

      res.render('./estados/ganaderia', {
        success,
        errors,
        data: JSON.stringify(datos.data),
      });
    })
    .catch((err) => {
      console.log(err.response.data);

      valError = err.response.data.error;
      res.render('./estados/ganaderia', { errors: valError, success: null });
    });
});

// @desc
// @route     GET /horse/horsemodal
// @access    Public
exports.ganaderiamodal = asyncHandler(async (req, res) => {
  const id = req.params.id
  const owner = req.params.owner
  let ganadero = null
  let urlax = null

  let config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
  }

  let machos = `${baseurl}/api/v1/horses?sex=Macho&sort=horseName&select=_id,horseName`

  const reqMachos = axios.get(machos, config)

  let resMachos = null

  axios
    .all([reqMachos])
    .then(
      axios.spread((...responses) => {
        const resMachos = responses[0].data
        console.log(resMachos.data)

        res.render('./estados/ganaderiamodal', {
          machos: resMachos.data,
          id,
        })
      })
    )
    .catch((errors) => {
      console.error(errors)
    })
})


// @desc      Registrando nuevo Ganadero
// @route     GET /horse/horsenew
// @access    Public
exports.horsesNew = asyncHandler(async (req, res) => {
  const newHorse = req.body;
  let id = newHorse._id;
  let salute = newHorse.salutation;
  newHorse._id = id.toUpperCase();
  newHorse.salutation = `${salute[0].toUpperCase()}${salute.slice(1)}`;
  req.flash('nuevo', newHorse);
  const errors = null;
  const success = null;

  const config = {
    method: 'POST',
    url: `${baseurl}/api/v1/horses`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
    data: newHorse,
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
// @route     GET /horse/register
// @access    Public
exports.register = asyncHandler(async (req, res) => {
  const newHorse = req.body;

  const id = req.params.id;
  const errors = null;
  const success = null;

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
      const data = response.data.data;
      console.log(data);

      res.render('./horses/horsesmodal', { success, errors, data });
    })
    .catch((err) => {
      console.log(err.response.data);

      valError = err.response.data.error;
      res.render('./horses/horsesmodal', { errors: valError, success: null });
    });
});

// @desc      Update an Horse
// @route     GET /horse/horseupdate7:_id
// @access    Public
exports.horsesUpdate = asyncHandler(async (req, res) => {
  const newHorse = req.body;
  const id = req.params.id;
  delete newHorse._id;

  const config = {
    method: 'PUT',
    url: `${baseurl}/api/v1/horses/${id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
    data: newHorse,
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

// @desc      delete an Horse
// @route     POST /horse/horsedelete
// @access    Private
exports.horsesDelete = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const config = {
    method: 'DELETE',
    url: `${baseurl}/api/v1/horses/${id}`,
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
