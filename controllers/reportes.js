const fs = require('fs');
const path = require('path');
const flash = require('connect-flash');
const asyncHandler = require('../middleware/async');
const axios = require('axios');


// @desc     Get horse
// @route     GET /horses/horse
// @access    Public
exports.general = asyncHandler(async (req, res) => {
    const errors = null;
    const success = null;
    let urlax = null;
  
    if (req.session.role !== 'admin') {
      urlax = `api/v1/horses?ownerId=${req.session.owner}`;
    } else {
      urlax = `api/v1/horses?country=México`;
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
  
        res.render('./reportes/general', {
          success,
          errors,
          data: JSON.stringify(datos.data),
        });
      })
      .catch((err) => {
        console.log(err.response.data);
  
        valError = err.response.data.error;
        res.render('./reportes/general', { errors: valError, success: null });
      });
  });


  // @desc     Get horse
// @route     GET /horses/horse
// @access    Public
exports.repCaballo = asyncHandler(async (req, res) => {
  const id = req.params.id
  let urlax = null;
  let opts = null
  switch(id) {
 
    case 1: //Pedigree
    opts = {
      titulo: "Pedigree"
    }
      break;
    case 2: //2 Listado de Caballos, 4 Criador, 5 Persona
      opts = {
        titulo: 'Listado de Caballos',
        id,
      }
      break;
    case 4:
      opts = {
        titulo: 'Listado de Caballos por Criador',
        id,
        url:  'api/v1/owners'
        
      }
      break;
    case 5:
      opts = {
        titulo: "Listado de Caballos por Persona",
        id,
        url:  'api/v1/owners'
      }
      break;

      
    case 3: //Descendencia
    opts = {
      titulo: "Descendencia de Sementales u Yeguas",
      id,
      url : 'api/v1/owners'
    }
      break;
  
    default:
                                          
  }

  const config = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
  };
  // let horses = `${baseurl}/api/v1/horses?imported=México`
  let horses = `${baseurl}/api/v1/horses`
  let owners = `${baseurl}/api/v1/owners?country=México`

const reqHorse = axios.get(horses, config)
const reqOwner = axios.get(owners, config);

axios
    .all([ reqOwner, reqHorse])
    .then(
      axios.spread((...responses) => {
        const resOwner = responses[0].data.data;
        const resHorse = responses[1].data.data;

          
        res.render('./reportes/caballos', {
          success : responses[1].data.success,
          data: JSON.stringify(resHorse),
          owners: resOwner
        });
      }))
      .catch((errors) => {
        console.error(errors);
      });
  });
