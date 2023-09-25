const fs = require('fs');
const path = require('path');
const flash = require('connect-flash');
const asyncHandler = require('../middleware/async');
const axios = require('axios');

// @desc     Get Arbol
// @route     GET /pedigrees/arbol
// @access    Public
exports.arbol = asyncHandler(async (req, res) => {
  const errors = null;
  const arbolData = {};
  const pedigrees = JSON.stringify({
    // id: '',
    // regNum: '',
    // regRef: '',
    // horseName: '',
    // sireName: '',
    // damName: '',
    // microchip: '',
    // breederId: '',
  });
  res.render('./pedigrees/arbol', { errors, pedigrees, arbolData });
});

// @desc
// @route     GET /pedigrees/arbolmodal
// @access    Public
exports.arbolmodal = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const ejemplares = req.flash('horsies')
  const ownerId = req.params.ownerId
  let arbolPhoto = null;
  const arbolData = null;


  // horse photos

  arbolPhoto = {
    ruta: ruta.HORSES,
    tipo: tipo.IMGS,
    id: ownerId,
    horseId: id,
  }

  let configPhoto = {
    headers: {
      'Content-Type': 'application/json',
    },
    data: arbolPhoto
  };


  //horse data


  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let pedigree = `${baseurl}/api/v1/pedigrees/${id}`;
  let horse = `${baseurl}/api/v1/horses/${id}`;
  let files = `${baseurl}/api/v1/utils/imageList`


  let resPedigree = null;
  let resHorse = null;
  let resFiles = null;
  let resHijos = null;
  try {
     resPedigree = await axios.get(pedigree, config)
    console.log(resPedigree.data)
  } catch (error) {
    console.error(error)
  }
   
 try {
    resHorse = await axios.get(horse, config)
   console.log(resHorse.data)
 } catch (error) {
   console.error(error)
 }
  
 try {
   resFiles = await axios.get(files, configPhoto)
  console.log(resFiles.data)
} catch (error) {
  console.error(error)
  data = null
  resFiles = {
    data: {
      success: true,
      data,
    },
  }

}
      
        let sexo = null;
        
        //descendencia
        if (resHorse.data.data.sex === 'Hembra') {
          sexo = `damRefNum=${id}`;
        } else {
          sexo = `sireRefNum=${id}`;
        }
        let hijos = `${baseurl}/api/v1/pedigrees?${sexo}`;
        const reqhijos = axios.get(hijos, config);

        try {
           resHijos = await axios.get(hijos, config)
          console.log(resHijos.data)
        } catch (error) {
          console.error(error)
        }


        
        ejemplares.push({ id: id, ownerId: resHorse.data.data.ownerId, horseName: resHorse.data.data.horseName || ""})
        req.flash('horsies', ejemplares)
              console.log(resPedigree.data, resHorse.data,  resHijos.data,  resFiles.data, 'ejemplares',ejemplares);
              res.render('./pedigrees/arbolmodal', {
                arbolData: JSON.stringify(resPedigree.data.data),
                resHorse: resHorse.data.data,
                data: resHorse.data.data,
                resHijos: JSON.stringify(resHijos.data.data),
                // valoracion: JSON.stringify(resHorse.data.data.valoracion),
                files: resFiles.data.data,
                ejemplares,

              });


      });

// @desc      GET Arbol
// @route     GET /pedigrees/arbolx
// @access    Public
exports.arbolx = asyncHandler(async (req, res) => {
  const { busqueda, datos } = req.body;
  let option = null;

  switch (busqueda) {
    case 'nombre':
      option = `horseName=${datos.toUpperCase()}`;
      //RegExp

      break;
    // case 'ganaderia':
    //   option = `ownerId=${datos.toUpperCase()}`;
    //   break;
    // case 'codigo':
    //   option = `regRef=${datos.toUpperCase()}`;
    //   break;
    case 'microchip':
      option = `microchip=${datos.toUpperCase()}`;
      break;
    default:
  }

  let config = {
    method: 'get',
    url: `${baseurl}/api/v1/pedigrees?${option}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  await axios(config)
    .then((response) => {
      const js = response.data;
      console.log(js);
      pedigrees = JSON.stringify(js.data);

      res.render('./pedigrees/arbol', { pedigrees });
    })
    .catch((err) => {
      console.log(err.response.data);

      errors = err.response.data.error;
      res.render('./pedigrees/arbol', { errors });
    });
});
