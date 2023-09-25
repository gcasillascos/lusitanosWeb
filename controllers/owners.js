const fs = require('fs');
const path = require('path');
const flash = require('connect-flash');
const asyncHandler = require('../middleware/async');
const axios = require('axios');

// @desc     Get owner
// @route     GET /owners/owner
// @access    Public
exports.owner = asyncHandler(async (req, res) => {
  const errors = null;
  const success = null;
  let urlax = null;

  if (req.session.role !== 'admin') {
    console.log(userData)
    // urlax = `api/v1/owners/${userData.user.owner}`;
    urlax = `api/v1/owners?_id=${userData.user.owner}`;
  } else {
    urlax = `api/v1/owners?socio=true`;
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
      res.render('./owners/owners', { success, errors, data: JSON.stringify(data.data) });
    })
    .catch((err) => {
      console.log(err.response.data);

      valError = err.response.data.error;
      res.render('./owners/owners', { errors: valError, success: null });
    });
});

// @desc
// @route     GET /owner/ownermodal
// @access    Public
exports.ownermodal = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const errors = null;
  const success = null;
  let ganadero = null;
  let urlax = null;
  let data={}

  if (id === '0') {
     data = {
      _id: null,
      lastName: null,
      firstName: null,
      salutation: null,
      farm: null,
      street: null,
      city: null,
      state: null,
      country: null,
      postalCode: null,
      phone: null,
      memberDate: null,
      rfc: null,
      website: null,
      email: null,
      deleted: null,
      deletedDate: null,
      "titular": [
        {
            "street": null,
            "city": null,
            "state": null,
            "country": null,
            "postalCode": null,
            "phone": null,
            "email": null,
        }
    ],
    "contacto": [
        {
          "chk":null,
          "street": null,
          "city": null,
          "state": null,
          "country": null,
          "postalCode": null,
          "phone": null,
          "email": null,
        }
    ],
    "representante": [
        {
          "chk":null,
          "street": null,
          "city": null,
          "state": null,
          "country": null,
          "postalCode": null,
          "phone": null,
          "email": null,
        }]
    };
    res.render('./owners/ownermodal', { success, errors, data, id });
  } else {
    arbolPhoto = {
      ruta: ruta.FARM,
      tipo: tipo.IMGS,
      id: id,
    }
    let config = {
      headers: {
        'Content-Type': 'application/json'
      },
    };

    let configPhoto = {
      headers: {
        'Content-Type': 'application/json',
      },
      data: arbolPhoto
    };
  
let owner = `${baseurl}/api/v1/owners/${id}`
let files = `${baseurl}/api/v1/utils/imageList`

const reqFiles = axios.get(files, configPhoto)
const reqOwner = axios.get(owner, config);

axios
    .all([ reqOwner, reqFiles])
    .then(
      axios.spread((...responses) => {
        const resOwner = responses[0].data.data;
        const resFiles = responses[1].data.data;




        if (resOwner.contacto.length === 0) {
          resOwner.contacto= [{
            "chk":null,
            "street": null,
            "city": null,
            "state": null,
            "country": null,
            "postalCode": null,
            "phone": null,
            "email": null,
          }]
        }

        if (resOwner.titular.length === 0) {
          resOwner.titular= [{
            "street": null,
            "city": null,
            "state": null,
            "country": null,
            "postalCode": null,
            "phone": null,
            "email": null,
          }]
        }

        if (resOwner.representante.length === 0) {
          resOwner.representante= [{
            "chk":null,
            "street": null,
            "city": null,
            "state": null,
            "country": null,
            "postalCode": null,
            "phone": null,
            "email": null,
          }]
        }


        res.render('./owners/ownersmodal', { success, errors, data: resOwner, files: resFiles, id });
      }))
      .catch((errors) => {
        console.error(errors);
      });
  }
});

// @desc      Registrando nuevo Ganadero
// @route     GET /owner/ownernew
// @access    Public
exports.ownersNew = asyncHandler(async (req, res) => {
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
exports.ownersUpdate = asyncHandler(async (req, res) => {
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
exports.ownersDelete = asyncHandler(async (req, res) => {
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

// @desc     Get ownerdir
// @route     GET /owners/ownerdir
// @access    Public
exports.ownerDir = asyncHandler(async (req, res) => {
  const errors = null;
  const success = null;

  let urlax = `api/v1/owners?socio=true`

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
      res.render('./owners/ownerdir', { success, errors, data: JSON.stringify(data.data) });
    })
    .catch((err) => {
      console.log(err.response.data);

      valError = err.response.data.error;
      res.render('./owners/ownerdir', { errors: valError, success: null });
    });
});


// @desc
// @route     GET /owner/ownerDirModal
// @access    Public
exports.ownerDirModal = asyncHandler(async (req, res) => {
  const id = req.params.id;
//  const ownerId = req.params.ownerId
  let arbolPhoto = null;
  let config = null;
  const errors = null;
  const success = null;
  let ganadero = null;
  let urlax = null;
  let data={}

  if (id === '0') {
     data = {
      _id: null,
      lastName: null,
      firstName: null,
      salutation: null,
      farm: null,
      street: null,
      city: null,
      state: null,
      country: null,
      postalCode: null,
      phone: null,
      memberDate: null,
      rfc: null,
      website: null,
      email: null,
      deleted: null,
      deletedDate: null,
      "titular": [
        {
            "street": null,
            "city": null,
            "state": null,
            "country": null,
            "postalCode": null,
            "phone": null,
            "email": null,
        }
    ],
    "contacto": [
        {
          "chk":null,
          "street": null,
          "city": null,
          "state": null,
          "country": null,
          "postalCode": null,
          "phone": null,
          "email": null,
        }
    ],
    "representante": [
        {
          "chk":null,
          "street": null,
          "city": null,
          "state": null,
          "country": null,
          "postalCode": null,
          "phone": null,
          "email": null,
        }]
    };
    res.render('./owners/ownerDirModal', { success, errors, data, id });
  } else {

    arbolPhoto = {
      ruta: ruta.FARM,
      tipo: tipo.IMGS,
      id: id,
    }
    config = {
      headers: {
        'Content-Type': 'application/json'
      },
    };

    let configPhoto = {
      headers: {
        'Content-Type': 'application/json',
      },
      data: arbolPhoto
    };
  
let owner = `${baseurl}/api/v1/owners/${id}`
let files = `${baseurl}/api/v1/utils/imageList`

const reqFiles = axios.get(files, configPhoto)
const reqOwner = axios.get(owner, config);

axios
    .all([ reqOwner, reqFiles])
    .then(
      axios.spread((...responses) => {
        const resOwner = responses[0].data.data;
        const resFiles = responses[1].data.data;




        if (resOwner.contacto.length === 0) {
          resOwner.contacto= [{
            "chk":null,
            "street": null,
            "city": null,
            "state": null,
            "country": null,
            "postalCode": null,
            "phone": null,
            "email": null,
          }]
        }



        res.render('./owners/ownerdirmodal', { success, errors, data: resOwner, files: resFiles, id });
      }))
      .catch((errors) => {
        console.error(errors);
      });
  }
});