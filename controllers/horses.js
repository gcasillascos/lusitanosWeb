const fs = require('fs')
const path = require('path')
const flash = require('connect-flash')
const asyncHandler = require('../middleware/async')
const axios = require('axios')

// @desc     Get horse
// @route     GET /horses/horse
// @access    Public
exports.horse = asyncHandler(async (req, res) => {
  const errors = null
  const success = null
  let urlax = null

  if (req.session.role !== 'admin') {
    urlax = `api/v1/horses?ownerId=${req.session.owner}`
  } else {
    urlax = `api/v1/horses?country=México&sort=-_id`
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

      res.render('./horses/horses', {
        success,
        errors,
        data: JSON.stringify(datos.data),
      })
    })
    .catch((err) => {
      console.log(err.response.data)

      valError = err.response.data.error
      res.render('./horses/horses', { errors: valError, success: null })
    })
})

// @desc
// @route     GET /horse/horsemodal
// @access    Public
exports.horsemodal = asyncHandler(async (req, res) => {
  const id = req.params.id
  const ownerId = req.params.ownerId
  let arbolPhoto = null
  const errors = null
  const success = null
  let ganadero = null
  let urlax = null

  if (id === '0') {
    let data = {}
    res.render('./horses/horsesmodal', { success, errors, data, id })
  } else {
    arbolPhoto = {
      ruta: ruta.HORSES,
      tipo: tipo.IMGS,
      horseId: id,
      id: ownerId,
    }
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${req.session.token}`,
      },
    }
    let configPhoto = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${req.session.token}`,
      },
      data: arbolPhoto,
    }

    let horse = `${baseurl}/api/v1/horses/${id}`
    let files = `${baseurl}/api/v1/utils/imageList`
    let machos = `${baseurl}/api/v1/horses?sex=Macho&ownerId=${ownerId}&sort=horseName&select=_id,horseName`
    let owners = `${baseurl}/api/v1/owners?select=_id,lastName,firstName,farm`
    let pedigree = `${baseurl}/api/v1/pedigrees/${id}`
    let countries = `${baseurl}/api/v1/owners/countries/0`

 
    let resFiles = null
    let resHorse = null
    let resMachos = null
    let resOwners = null
    let resPedigree = null
    let resHijos = null
    let resCountries = null

   await axios
      .get(files, configPhoto)
      .then((response) => {
        resFiles = response.data.data  //Imagenes
        return  axios.get(horse, config)
      })
      .then((response) => {
        resHorse = response.data.data //Datos del Caballo
        return  axios.get(machos, config)
      })
      .then((response) => {
        resMachos = response.data.data //Machos de la ganaderia
        return axios.get(owners, config)
      })
      .then((response) => {
        resOwners = response.data.data  // Dueños de las ganederias
        return axios.get(pedigree,config)
      })
      .then((response) => {
        resPedigree = response.data.data  //Arbol genealogico
        let sexo = null;
        
        //descendencia
        if (resHorse.sex === 'Hembra') {
          sexo = `damRefNum=${id}`;
        } else {
          sexo = `sireRefNum=${id}`;
        }
        let hijos = `${baseurl}/api/v1/pedigrees?${sexo}`;

        return axios.get(hijos,config)
      })
      .then((response) => {
        resHijos = response.data.data  // descendencia
        return axios.get(countries,config)
      })
      .then((response) => {
        resCountries = response.data.data
      })
      .catch((error) => 
        
      console.log(error.response))

   await res.render('./horses/horsesmodal', {
      data: resHorse,
      machos: resMachos,
      files: resFiles,
      owners: resOwners,
      hijos: resHijos,
      countries: resCountries,
      arbolData: JSON.stringify(resPedigree === null ? [] : resPedigree ),
      id,
      token: req.session.token
    })

    //       .catch((errors) => {
    //         console.error(errors);
    //       });
  }
})

// @desc      Registrando nuevo Ganadero
// @route     GET /horse/horsenew
// @access    Public
exports.horsesNew = asyncHandler(async (req, res) => {
  const newHorse = req.body
  let id = newHorse._id
  let salute = newHorse.salutation
  newHorse._id = id.toUpperCase()
  newHorse.salutation = `${salute[0].toUpperCase()}${salute.slice(1)}`
  req.flash('nuevo', newHorse)
  const errors = null
  const success = null

  const config = {
    method: 'POST',
    url: `${baseurl}/api/v1/horses`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
    data: newHorse,
  }

  await axios(config)
    .then((response) => {
      const data = response.data
      data.msg = `Registro ${data.data._id}, creado correctamente`
      console.log(data)
      const id = '0'
      res.json(data)
    })
    .catch((err) => {
      console.log(err.response.data)
      const id = '0'
      valError = err.response.data.error
      res.json(err.response.data)
    })
})

// @desc      Registrando un nuevo Ganadero
// @route     GET /horse/register
// @access    Public
exports.register = asyncHandler(async (req, res) => {
  const newHorse = req.body

  const id = req.params.id
  const errors = null
  const success = null

  const config = {
    method: 'get',
    url: `${baseurl}/api/v1/horses/${id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
  }

  await axios(config)
    .then((response) => {
      const data = response.data.data
      console.log(data)

      res.render('./horses/horsesmodal', { success, errors, data })
    })
    .catch((err) => {
      console.log(err.response.data)

      valError = err.response.data.error
      res.render('./horses/horsesmodal', { errors: valError, success: null })
    })
})

// @desc      Update an Horse
// @route     GET /horse/horseupdate7:_id
// @access    Public
exports.horsesUpdate = asyncHandler(async (req, res) => {
  const newHorse = req.body
  const id = req.params.id
  delete newHorse._id

  const config = {
    method: 'PUT',
    url: `${baseurl}/api/v1/horses/${id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
    data: newHorse,
  }

  await axios(config)
    .then((response) => {
      const data = response.data
      data.msg = `Registro ${data.data._id}, modificado correctamente`
      console.log(data)

      res.json(data)
    })
    .catch((err) => {
      console.log(err.response.data)
      res.json(err.response.data)
    })
})

// @desc      delete an Horse
// @route     POST /horse/horsedelete
// @access    Private
exports.horsesDelete = asyncHandler(async (req, res) => {
  const id = req.params.id

  const config = {
    method: 'DELETE',
    url: `${baseurl}/api/v1/horses/${id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
  }

  await axios(config)
    .then((response) => {
      const data = response.data
      data.msg = `Registro ${data.data._id}, eliminado correctamente`
      console.log(data)

      res.json(data)
    })
    .catch((err) => {
      console.log(err.response.data)
      res.json(err.response.data)
    })
})


////////////////// Sanitarios ///////////////

// @desc      Registro Sanitario
// @route     POST horses/${id}/sanitario
// @access    Public
exports.horsesSanitariosNew = asyncHandler(async (req, res) => {
  const newSanitario = req.body;
  const id = req.params.id

  const datos = {
    "Sanit": [
      {
      fecha : newSanitario.fechAplSan,
      comentario : newSanitario.notesSan,
      monto : newSanitario.montoSan,
      }
    ]
  }
 
  const config = {
    method: 'post',
    url: `${baseurl}/api/v1/horses/${id}/sanitario`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
    data : datos,
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

// @desc      Registro Sanitario
// @route     PUT horses/${id}/sanitario
// @access    Public
exports.horsesSanitariosUpdate = asyncHandler(async (req, res) => {
  const newSanitario = req.body;
  const id = req.params.id

  const datos = {
    "Sanit": [
      {
      _id : newSanitario.sanId,
      fecha : newSanitario.fechAplSan,
      comentario : newSanitario.notesSan,
      monto : newSanitario.montoSan,
      }
    ]
  }
 
  const config = {
    method: 'put',
    url: `${baseurl}/api/v1/horses/${id}/sanitario`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
    data : datos,
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

// @desc      Registro Sanitario
// @route     DELETE horses/${id}/sanitario
// @access    Public
exports.horsesSanitariosDelete = asyncHandler(async (req, res) => {
  const newSanitario = req.body;
  const id = req.params.id

  const datos = {
    "Sanit": [
      {
      _id : newSanitario.sanId,
      fecha : newSanitario.fechAplSan,
      comentario : newSanitario.notesSan,
      monto : newSanitario.montoSan,
      }
    ]
  }
 
  const config = {
    method: 'put',
    url: `${baseurl}/api/v1/horses/${id}/sanitario`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
    data : datos,
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

//////////////////////////// Nutricionales ///////////////////////////

// @desc      Registro Nutricional
// @route     POST horses/${id}/sanitario
// @access    Public
exports.horsesNutricionalesNew = asyncHandler(async (req, res) => {
  const newNutricional = req.body;
  const id = req.params.id

  const datos = {
    "Nutri": [
      {
      fecha : newNutricional.fechAplNut,
      comentario : newNutricional.notesNut,
      monto : newNutricional.montoNut,
      }
    ]
  }
 
  const config = {
    method: 'post',
    url: `${baseurl}/api/v1/horses/${id}/nutricional`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
    data : datos,
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

// @desc      Registro Nutricional
// @route     PUT horses/${id}/nutricional
// @access    Public
exports.horsesNutricionalesUpdate = asyncHandler(async (req, res) => {
  const newNutricional = req.body;
  const id = req.params.id

  const datos = {
    "Nutri": [
      {
      _id : newNutricional.nutId,
      fecha : newNutricional.fechAplNut,
      comentario : newNutricional.notesNut,
      monto : newNutricional.montoNut,
      }
    ]
  }
 
  const config = {
    method: 'put',
    url: `${baseurl}/api/v1/horses/${id}/nutricional`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
    data : datos,
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

// @desc      Registro Nutricional
// @route     PUT horses/${id}/sanitario
// @access    Public
exports.horsesNutricionalesDelete = asyncHandler(async (req, res) => {
  const newNutricional = req.body;
  const id = req.params.id

  const datos = {
    "Nutri": [
      {
      _id : newNutricional.nutId,
      fecha : newNutricional.fechAplNut,
      comentario : newNutricional.notesNut,
      monto : newNutricional.montoNut,
      }
    ]
  }
 
  const config = {
    method: 'put',
    url: `${baseurl}/api/v1/horses/${id}/sanitario`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
    data : datos,
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



//////////////////////////// Premios ///////////////////////////

// @desc      Registro Premio
// @route     POST horses/${id}/sanitario
// @access    Public
exports.horsesPremiosNew = asyncHandler(async (req, res) => {
  const newPremio = req.body;
  const id = req.params.id

  const datos = {
    "Premios": [
      {
      fecha : newPremio.fechAplPre,
      comentario : newPremio.notesPre,
      monto : newPremio.montoPre,
      }
    ]
  }
 
  const config = {
    method: 'post',
    url: `${baseurl}/api/v1/horses/${id}/nutricional`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
    data : datos,
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

// @desc      Registro Premio
// @route     PUT horses/${id}/nutricional
// @access    Public
exports.horsesPremiosUpdate = asyncHandler(async (req, res) => {
  const newPremio = req.body;
  const id = req.params.id

  const datos = {
    "Premios": [
      {
      _id : newPremio.preId,
      fecha : newPremio.fechAplPre,
      comentario : newPremio.notesPre,
      monto : newPremio.montoPre,
      }
    ]
  }
 
  const config = {
    method: 'put',
    url: `${baseurl}/api/v1/horses/${id}/nutricional`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
    data : datos,
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

// @desc      Registro Premio
// @route     PUT horses/${id}/sanitario
// @access    Public
exports.horsesPremiosDelete = asyncHandler(async (req, res) => {
  const newPremio = req.body;
  const id = req.params.id

  const datos = {
    "Premios": [
      {
      _id : newPremio.preId,
      fecha : newPremio.fechAplPre,
      comentario : newPremio.notesPre,
      monto : newPremio.montoPre,
      }
    ]
  }
 
  const config = {
    method: 'put',
    url: `${baseurl}/api/v1/horses/${id}/sanitario`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
    data : datos,
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


/////////////////// valoraciones /////////////////////////////////////


// @desc      Registro Premio
// @route     POST horses/${id}/sanitario
// @access    Public
exports.horsesValoracionNew = asyncHandler(async (req, res) => {
  const newValor = req.body;
  const id = req.params.id

  const datos = {
    "Premios": [
      {
      fecha : newValor.fechAplPre,
      comentario : newValor.notesPre,
      monto : newValor.montoPre,
      }
    ]
  }
 
  const config = {
    method: 'post',
    url: `${baseurl}/api/v1/horses/${id}/nutricional`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
    data : datos,
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

// @desc      Registro Premio
// @route     PUT horses/${id}/nutricional
// @access    Public
exports.horsesValoracionUpdate = asyncHandler(async (req, res) => {
  const newValor = req.body;
  const id = req.params.id

  const datos = {
    "Premios": [
      {
      _id : newValor.preId,
      fecha : newValor.fechAplPre,
      comentario : newValor.notesPre,
      monto : newValor.montoPre,
      }
    ]
  }
 
  const config = {
    method: 'put',
    url: `${baseurl}/api/v1/horses/${id}/nutricional`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
    data : datos,
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

// @desc      Registro Premio
// @route     PUT horses/${id}/sanitario
// @access    Public
exports.horsesValoracionDelete = asyncHandler(async (req, res) => {
  const newValor = req.body;
  const id = req.params.id

  const datos = {
    "Premios": [
      {
      _id : newValor.preId,
      fecha : newValor.fechAplPre,
      comentario : newValor.notesPre,
      monto : newValor.montoPre,
      }
    ]
  }
 
  const config = {
    method: 'put',
    url: `${baseurl}/api/v1/horses/${id}/sanitario`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.session.token}`,
    },
    data : datos,
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
