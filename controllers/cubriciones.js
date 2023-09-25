const fs = require('fs')
const path = require('path')
const flash = require('connect-flash')
const asyncHandler = require('../middleware/async')
const axios = require('axios')
const _ = require('underscore')

// @desc     Get horse
// @route     GET /horses/horse
// @access    Public
exports.cubricion = asyncHandler(async (req, res) => {
  const errors = null
  const success = null
  let urlax = null

  if (req.session.role !== 'admin') {
    urlax = `api/v1/owners?_id=${req.session.owner}`
  } else {
    urlax = `api/v1/owners?country=México`
  }

  const config = {
    method: 'get',
    url: `${baseurl}/${urlax}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
  }

  await axios(config)
    .then((response) => {
      const datos = response.data
      console.log(datos)
      datos.token = req.session.token



    //  datos.data[0].horses = _.where(datos.data[0].horses, {sex: 'Hembra'});

      datos.data[0].horses = datos.data[0].horses.filter(element => 
        element.foalingDate <= subtractYears(3) && element.sex === 'Hembra')

      res.render('./cubriciones/cubricion', {
        success,
        errors,
        data: JSON.stringify(datos.data),
      })
    })
    .catch((err) => {
      console.log(err.response.data)

      valError = err.response.data.error
      res.render('./cubriciones/cubricion', { errors: valError, success: null })
    })
})

// @desc
// @route     GET /horse/horsemodal
// @access    Public
exports.cubricionmodal = asyncHandler(async (req, res) => {
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

        res.render('./cubriciones/cubricionmodal', {
          machos: resMachos.data,
          id,
        })
      })
    )
    .catch((errors) => {
      console.error(errors)
    })
})


function subtractYears(numberOfYears, date = new Date()) {
  date.setFullYear(date.getFullYear() - numberOfYears)
  let fecha = date.toISOString().slice(0, 10);
console.log(fecha);
  return fecha
}



// @desc      Registrando nuevo Ganadero
// @route     GET /owner/ownernew
// @access    Public
exports.cubricionNew = asyncHandler(async (req, res) => {
  const cadena = "00000"
  const newCub = req.body;
  newCub.damRegNum = (cadena + newCub.damRegNum).substring((cadena + newCub.damRegNum).length -6);
  req.flash('nuevo', newCub);
  const errors = null;
  const success = null;

  const cubricion = newRegMapping(newCub)

  const config = {
    method: 'POST',
    url: `${baseurl}/api/v1/horses/${newCub.damRegNum}/cubriciones`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
    data: cubricion,
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

      res.render('./owners/ownersmodal', { success, errors, data });
    })
    .catch((err) => {
      console.log(err.response.data);

      valError = err.response.data.error;
      res.render('./owners/ownersmodal', { errors: valError, success: null });
    });
});

// @desc      Update an Owner
// @route     GET /owner/ownerupdate7:_id
// @access    Public
exports.cubricionUpdate = asyncHandler(async (req, res) => {
  const newCub = req.body;
  const id = req.params.id;

  newCub.damRegNum = id
  const regModificar = newCub.cubId

  const cubricion = updateRegMapping(newCub)


  const config = {
    method: 'PUT',
    url: `${baseurl}/api/v1/cubriciones/${regModificar}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
    data: cubricion,
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

    if(newCub.horseNameC != '') {

      const nacimiento = mapeoNacimiento(cubricion)
      const configNat = {
        method: 'POST',
        url: `${baseurl}/api/v1/nacimientos`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${req.session.token}`,
        },
        data: nacimiento,
      };
    
      await axios(configNat)
        .then((response) => {
          const data = response.data;
         // data.msg = `Registro ${data.data._id}, modificado correctamente`;
          console.log(data);
    
          res.json(data);
        })
        .catch((err) => {
          console.log(err);
          res.json(err);
        });



    }




});

// @desc      delete an Owner
// @route     POST /owner/ownerdelete
// @access    Private
exports.cubricionDelete = asyncHandler(async (req, res) => {
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


function newRegMapping(data){

  cubricion = {
    damRegNum: data.damRegNum,
    sireRegNum: data.sireName,
    tipoCubricion: data.tipoCubricion,
    ultimaMonta: data.ultimaMonta,
    deliveryDate: data.deliveryDate,
  }

  return cubricion
}

function updateRegMapping(data) {

  cubricion = {
  damRegNum: data.damRegNum,
  sireRegNum: data.sireName,
  tipoCubricion: data.tipoCubricion,
  ultimaMonta: data.ultimaMonta,
  deliveryDate: data.deliveryDate,
  resCubricion: data.resCubricion,
  desc: data.desc,
  }

  if(data.sexC != 'none'){
    cubricion.horseName = data.horseNameC
    cubricion.sex = data.sexC
    cubricion.foalingDate = data.foalingDateC
    cubricion.status = true
    cubricion.statusDate = Date.now
  }

  if(data.resCubricion != 'Gestante' && data.resCubricion != 'Gestación Gemelar') {
    cubricion.status = true
    cubricion.statusDate = Date.now

  }
return cubricion
}
  
function mapeoNacimiento(data) {
  return registro = {
    horseName: data.horseName,
    foalingDate: data.foalingDate,
    sex: data.sex,
    damRegNum: data.damRegNum,
    sireRegNum: data.sireRegNum,
    tipoCubricion: data.tipoCubricion,
  }
} 