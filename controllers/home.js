const fs = require('fs');
const path = require('path');
const asyncHandler = require('../middleware/async');

const testFolder = path.join(__dirname, '..', '/public/assets/carro/');
// console.log(testFolder);

// module.exports = async (req, res) => {
//   fs.readdir(testFolder, (err, files) => {
//     /*        files.forEach(file => {
//             console.log(file);
//         });*/
//     res.render('index', {
//       files,
//     });
//   });
// };



exports.home = asyncHandler(async (req,res) => {
  fs.readdir(testFolder, (err, files) => {

  res.render('index', {
    files,
  });

  })

  
})
  
  
//   async (req, res) => {
  
//     /*        files.forEach(file => {
//             console.log(file);
//         });*/
//     res.render('index', {
//       files,
//     });
//   });
// };


exports.formato = asyncHandler(async (req, res) => {

  res.render('formato', {

  });
});

exports.reglamento = asyncHandler(async (req, res) => {

  res.render('reglamento', {

  });
});