const fs = require('fs');
const path = require('path');
const flash = require('connect-flash');
const asyncHandler = require('../middleware/async');
const axios = require('axios');

// @desc     Get preRegistro
// @route     GET /preRegistro
// @access    Public
exports.preRegistro = asyncHandler(async (req, res) => {
  const errors = null;
  const success = null;
  let urlax = null;

  if (req.session.role !== 'admin') {
    urlax = `api/v1/owners?_id=${req.session.owner}`
  } else {
    urlax = `api/v1/preregistros`
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

      res.render('./formatos/preregistro', {
        success,
        errors,
        data: JSON.stringify(datos.data),
      });
    })
    .catch((err) => {
      console.log(err.response.data);

      valError = err.response.data.error;
      res.render('./formatos/preregistro', { errors: valError, success: null });
    });
});

// @desc     Get preRegistro
// @route     POST /preRegistro
// @access    Public
exports.agregaPreRegistro = asyncHandler(async (req, res) => {
  const errors = null;
  const success = null;
  let urlax = null;
  let data = null;
  const id = req.body._id


  if (req.session.role !== 'admin') {
    urlax = `api/v1/owners?_id=${req.session.owner}`
  } else {
    urlax = `api/v1/preregistros`
    data = mapeoNacimiento(req.body)
  }

  const config = {
    method: 'POST',
    url: `${baseurl}/${urlax}`,
    data,
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

      // res.render('./formatos/preregistro', {
      //   success,
      //   errors,
      //   data: JSON.stringify(datos.data),
      // });
    })
    .catch((err) => {
      console.log(err.response.data);

      valError = err.response.data.error;
      res.render('./formatos/preregistro', { errors: valError, success: null });
    });

// Hacer el update del registro de nacimientos
    urlNac = `api/v1/nacimientos/${id}`


    const configNac = {
      method: 'PUT',
      url: `${baseurl}/${urlNac}`,
      data: {regPre: true},
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${req.session.token}`,
      },
    };


    await axios(configNac)
    .then((response) => {
      const datos = response.data;
      console.log(datos);
      datos.token = req.session.token;

    })
    .catch((err) => {
      console.log(err.response.data);

      valError = err.response.data.error;
  //    res.render('./formatos/preregistro', { errors: valError, success: null });
    });






});




// @desc
// @route     GET /preRegistro/horsemodal
// @access    Public
exports.preRegistroModal = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const ownerId = req.params.ownerId
  let arbolPhoto = null;
  const errors = null;
  const success = null;
  let ganadero = null;
  let urlax = null;

  if (id === '0') {

    let data = {};
    res.render('./formatos/preregistromodal', { success, errors, data, id });
  } else {

    arbolPhoto = {
      ruta: ruta.HORSES,
      tipo: tipo.IMGS,
      horseId: id,
      id: ownerId
    }
    let config = {
      headers: {
        'Content-Type': 'application/json'
      },
      Authorization: `Bearer ${req.session.token}`,
    };
    let configPhoto = {
      headers: {
        'Content-Type': 'application/json',
      },
      data: arbolPhoto
    };

let preRegistro = `${baseurl}/api/v1/horses/${id}`
let files = `${baseurl}/api/v1/utils/imageList`

const reqFiles = axios.get(files, configPhoto)
const reqHorse = axios.get(preRegistro, config);

axios
    .all([ reqHorse, reqFiles])
    .then(
      axios.spread((...responses) => {
        const resHorse = responses[0].data.data;
        const resFiles = responses[1].data.data;




        res.render('./formatos/preregistromodal', { success, errors, data: resHorse, files: resFiles, id });
      }))
      .catch((errors) => {
        console.error(errors);
      });
  }
});

//// valuacion

// @desc     Get valuacion
// @route     GET /horses/valuacion
// @access    Public
exports.valuacion = asyncHandler(async (req, res) => {
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
  
        res.render('./formatos/valoraciones', {
          success,
          errors,
          data: JSON.stringify(datos.data),
        });
      })
      .catch((err) => {
        console.log(err.response.data);
  
        valError = err.response.data.error;
        res.render('./formatos/valoraciones', { errors: valError, success: null });
      });
  });
  
  // @desc
  // @route     GET /valuacion/valuacionmodal
  // @access    Public
  exports.valuacionModal = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const ownerId = req.params.ownerId
    let arbolPhoto = null;
    const errors = null;
    const success = null;
    let ganadero = null;
    let urlax = null;
  
    if (id === '0') {
  
      let data = {};
      res.render('./formatos/valuacionmodal', { success, errors, data, id });
    } else {
  
      arbolPhoto = {
        ruta: ruta.HORSES,
        tipo: tipo.IMGS,
        horseId: id,
        id: ownerId
      }
      let config = {
        headers: {
          'Content-Type': 'application/json'
        },
        Authorization: `Bearer ${req.session.token}`,
      };
      let configPhoto = {
        headers: {
          'Content-Type': 'application/json',
        },
        data: arbolPhoto
      };
  
  let valuacion
 = `${baseurl}/api/v1/horses/${id}`
  let files = `${baseurl}/api/v1/utils/imageList`
  
  const reqFiles = axios.get(files, configPhoto)
  const reqHorse = axios.get(valuacion
, config);
  
  axios
      .all([ reqHorse, reqFiles])
      .then(
        axios.spread((...responses) => {
          const resHorse = responses[0].data.data;
          const resFiles = responses[1].data.data;
  
  
  
  
          res.render('./formatos/preregistromodal', { success, errors, data: resHorse, files: resFiles, id });
        }))
        .catch((errors) => {
          console.error(errors);
        });
    }
  });


  //// fertilidad

// @desc     Get fertilidad
// @route     GET /horses/fertilidad
// @access    Public
exports.fertilidad = asyncHandler(async (req, res) => {
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
  
        res.render('./formatos/fertilidades', {
          success,
          errors,
          data: JSON.stringify(datos.data),
        });
      })
      .catch((err) => {
        console.log(err.response.data);
  
        valError = err.response.data.error;
        res.render('./formatos/fertilidades', { errors: valError, success: null });
      });
  });
  
  // @desc
  // @route     GET /fertilidad/fertilidadmodal
  // @access    Public
  exports.fertilidadModal = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const ownerId = req.params.ownerId
    let arbolPhoto = null;
    const errors = null;
    const success = null;
    let ganadero = null;
    let urlax = null;
  
    if (id === '0') {
  
      let data = {};
      res.render('./formatos/fertilidadmodal', { success, errors, data, id });
    } else {
  
      arbolPhoto = {
        ruta: ruta.HORSES,
        tipo: tipo.IMGS,
        horseId: id,
        id: ownerId
      }
      let config = {
        headers: {
          'Content-Type': 'application/json'
        },
        Authorization: `Bearer ${req.session.token}`,
      };
      let configPhoto = {
        headers: {
          'Content-Type': 'application/json',
        },
        data: arbolPhoto
      };
  
  let fertilidad
 = `${baseurl}/api/v1/horses/${id}`
  let files = `${baseurl}/api/v1/utils/imageList`
  
  const reqFiles = axios.get(files, configPhoto)
  const reqHorse = axios.get(fertilidad
, config);
  
  axios
      .all([ reqHorse, reqFiles])
      .then(
        axios.spread((...responses) => {
          const resHorse = responses[0].data.data;
          const resFiles = responses[1].data.data;
  
  
  
  
          res.render('./formatos/fertilidadesmodal', { success, errors, data: resHorse, files: resFiles, id });
        }))
        .catch((errors) => {
          console.error(errors);
        });
    }
  });


  function mapeoNacimiento(data) {

    data.nacimientos = data._id
    delete data._id
    delete data.regPre
    delete data.regFinal
    delete data.deleted
    delete data.lastUpdate
    delete data.__v
    delete data.id
    data.ownerId = data.breederId
    return data
  }


  