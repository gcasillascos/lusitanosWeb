const fs = require('fs');
const path = require('path');
const flash = require('connect-flash');
const asyncHandler = require('../middleware/async');
const axios = require('axios');

// @desc      Registrnado un nuevo Ganadero
// @route     GET /owner/register
// @access    Public
exports.horsesSanitarioNew = asyncHandler(async (req, res) => {
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