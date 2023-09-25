const express = require('express');
const {
  caballos

} = require('../controllers/impresion');

const router = express.Router({ mergeParams: true });


router.route('/caballos/:id').get(caballos)
//router.route('/pedigree/:id').get(getCaballos)

module.exports = router;
