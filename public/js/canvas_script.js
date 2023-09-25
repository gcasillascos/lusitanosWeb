window.onload = function () {
  let canvas = document.getElementById('paint-canvas')
  let ctx = canvas.getContext('2d')
  let boundings = canvas.getBoundingClientRect()

const horse = document.getElementById('paint-canvas').dataset.data_id
console.log( 'imagen',horse)

  const img = new Image() 
 // img.src = 'horse.png' 
  img.src = `https://lusitanos.s3.us-east-1.amazonaws.com/markings/${horse}.bmp`

  let mouseX=0
  let mouseY=0
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 1
  let isDrawing = false

  let color = document.getElementsByClassName('colors')[0]

  color.addEventListener('click', function (event) {
    ctx.strokeStyle = event.target.value || 'black'
    console.log(ctx.strokeStyle)
  })

  let brush = document.getElementsByClassName('brushes')[0]

  brush.addEventListener('click', function (event) {
    ctx.lineWidth = event.target.value || 1
  })

  let button = document.getElementsByClassName('buttons')[0]

  button.addEventListener('click', function (event) {
    console.log(event.target.value)

    
  })

  canvas.addEventListener('mousedown', function (event) {
    setMouseCoord(event)
    isDrawing = true

    ctx.beginPath()
    ctx.moveTo(mouseX,mouseY)
  })

  canvas.addEventListener('mousemove', function (event) {
    setMouseCoord(event)

    if(isDrawing) {
        ctx.lineTo(mouseX, mouseY)
        ctx.stroke()
    }

  })

  canvas.addEventListener('mouseup', function (event) {
    setMouseCoord(event)
    isDrawing = false
  })


  let clearButton = document.getElementById('clear')

  clearButton.addEventListener('click',function () {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(img,0,0);
    console.log('clear')

  })


  let saveButton = document.getElementById('save')

  saveButton.addEventListener('click',function () {
    console.log('save')

  })


  let deleteButton = document.getElementById('delete')

  deleteButton.addEventListener('click',function () {
    console.log('delete')
    ctx.strokeStyle = 'white'
  })

  function setMouseCoord(event){
    mouseX = event.clientX - boundings.left
    mouseY = event.clientY - boundings.top
    console.log(mouseX, mouseY)
  }


  function drawImg() {

    ctx.drawImage(this, 0, 0, canvas.width, canvas.height)
  }




}
