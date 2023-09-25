const fs = require('fs');
const path = require('path');
const flash = require('connect-flash');
const asyncHandler = require('../middleware/async');
const axios = require('axios');


// @desc     Get ownerdir
// @route     GET /owners/ownerdir
// @access    Public
exports.cuentasConc = asyncHandler(async (req, res) => {
    const errors = null;
    const success = null;
  
    let urlax = `api/v1/conceptos?status=Socios`
  
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
        res.render('./cuentas/conceptos', { success, errors, data: JSON.stringify(data.data), data2: JSON.stringify(data.data) });
      })
      .catch((err) => {
        console.log(err.response.data);
  
        valError = err.response.data.error;
        res.render('./cuentas/conceptos', { errors: valError, success: null });
      });
  });
  
  
  // @desc
  // @route     GET /owner/ownerDirModal
  // @access    Public
  exports.cuentasConcModal = asyncHandler(async (req, res) => {
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
      res.render('./owners/ownerDirModal', { success, errors, data, id });
    } else {
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
           data = response.data.data;
          console.log(data);
  
          if (data.titular.length === 0) {
            data.titular=[{
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
  
          if (data.contacto.length === 0) {
            data.contacto= [{
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
  
          if (data.representante.length === 0) {
            data.representante= [{
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
  
          res.render('./owners/ownerdirmodal', { success, errors, data, id });
        })
        .catch((err) => {
          console.log(err.response.data);
  
          valError = err.response.data.error;
          res.render('./owners/ownerdirmodal', { errors: valError, success: null });
        });
    }
  });