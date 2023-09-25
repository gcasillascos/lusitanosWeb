
const asyncHandler = require('../middleware/async');
const PDFDocument =  require('pdfkit');
const base64 = require('base64-stream');
const fs = require('fs')
const path = require('path')

// @desc      Get all users
// @route     GET /api/v1/users
// @access    Private/Admin
exports.caballos = asyncHandler(async (req, res, next) => {

  let filename = 'test'
  // Stripping special characters
  filename = encodeURIComponent(filename) + '.pdf'

  const pdfBuffer = await new Promise(resolve => {
    const doc = new PDFDocument({ size: 'LETTER', font: 'Helvetica', margin: 25 , bufferPages: true, pdfVersion: '1.7'})

    doc.pipe(fs.createWriteStream('caballos.pdf'))
    doc.fillColor('green')
    doc.text('asdfasdfa asdfasdfsa  adsfasdfasfas', 50, 50)
    doc.end() 



  const buffers = []
    doc.on("data", buffers.push.bind(buffers))
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers)
      resolve(pdfData)
    })

  })

console.log(pdfBuffer.toString("base64"))
  res.status(200).json({
    success: true,
   headers: {
      "content-type": "application/pdf",
    },
    body: pdfBuffer.toString("base64"),
    isBase64Encoded: true,
  });

  
 } )