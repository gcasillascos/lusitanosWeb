
 
// Reference to the canvas element
let canvas;
// Context provides functions used for drawing and 
// working with Canvas
let ctx;
// Stores previously drawn image data to restore after
// new drawings are added
let savedImageData;
// Stores whether I'm currently dragging the mouse
let dragging = false;
let strokeColor = 'black';
let fillColor = 'black';
let line_Width = 5;
let polygonSides = 7;
let backgroundImage = new Image()
// Tool currently using
let currentTool = 'brush';
let canvasWidth = 1024;
let canvasHeight = 853;
let img = new Image();
let usingBrush = false;
let brushXPoints = new Array()
let brushYPoints = new Array()
let brushDownPos = new Array()
 
// Stores size data used to create rubber band shapes
// that will redraw as the user moves the mouse
class ShapeBoundingBox{
    constructor(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
}
 
// Holds x & y position where clicked
class MouseDownPos{
    constructor(x,y) {
        this.x = x,
        this.y = y;
    }
}
 
// Holds x & y location of the mouse
class Location{
    constructor(x,y) {
        this.x = x,
        this.y = y;
    }
}
 
// Holds x & y polygon point values
class PolygonPoint{
    constructor(x,y) {
        this.x = x,
        this.y = y;
    }
}
// Stores top left x & y and size of rubber band box 
let shapeBoundingBox = new ShapeBoundingBox(0,0,0,0);
// Holds x & y position where clicked
let mousedown = new MouseDownPos(0,0);
// Holds x & y location of the mouse
let loc = new Location(0,0);
 
// Call for our function to execute when page is loaded
document.addEventListener('DOMContentLoaded', setupCanvas);
 
function setupCanvas(){
    // Get reference to canvas element
    canvas = document.getElementById('my-canvas');
    // Get methods for manipulating the canvas
    ctx = canvas.getContext('2d');
    alert('cargando imagen')
    img.src = '/assets/icons/horse.png'
    img.onload = () => 
    { 
        
        ctx.drawImage(img,0,0)
    }

    ctx.drawImage(img, 0, 0);
    ctx.strokeStyle = strokeColor;
    
    ctx.lineWidth = line_Width;


    // Execute ReactToMouseDown when the mouse is clicked
    canvas.addEventListener("mousedown", ReactToMouseDown);
    // Execute ReactToMouseMove when the mouse is clicked
    canvas.addEventListener("mousemove", ReactToMouseMove);
    // Execute ReactToMouseUp when the mouse is clicked
    canvas.addEventListener("mouseup", ReactToMouseUp);
}
 
function ChangeTool(toolClicked){
    document.getElementById("open").className = "";
    document.getElementById("save").className = "";
    document.getElementById("brush").className = "";
    document.getElementById("line").className = "";
    document.getElementById("rectangle").className = "";
    document.getElementById("circle").className = "";
    document.getElementById("ellipse").className = "";
    document.getElementById("polygon").className = "";
    // Highlight the last selected tool on toolbar
    document.getElementById(toolClicked).className = "selected";
    // Change current tool used for drawing
    currentTool = toolClicked;
}
 
// Returns mouse x & y position based on canvas position in page
function GetMousePosition(x,y){
    // Get canvas size and position in web page
    let canvasSizeData = canvas.getBoundingClientRect();
    return { x: (x - canvasSizeData.left) * (canvas.width  / canvasSizeData.width),
        y: (y - canvasSizeData.top)  * (canvas.height / canvasSizeData.height)
      };
}
 
function SaveCanvasImage(){
    // Save image
    savedImageData = ctx.getImageData(0,0,canvas.width,canvas.height);
}
 
function RedrawCanvasImage(){
    // Restore image
    ctx.putImageData(savedImageData,0,0);
}
 
function UpdateRubberbandSizeData(loc){
    // Height & width are the difference between were clicked
    // and current mouse position
    shapeBoundingBox.width = Math.abs(loc.x - mousedown.x);
    shapeBoundingBox.height = Math.abs(loc.y - mousedown.y);
 
    // If mouse is below where mouse was clicked originally
    if(loc.x > mousedown.x){
 
        // Store mousedown because it is farthest left
        shapeBoundingBox.left = mousedown.x;
    } else {
 
        // Store mouse location because it is most left
        shapeBoundingBox.left = loc.x;
    }
 
    // If mouse location is below where clicked originally
    if(loc.y > mousedown.y){
 
        // Store mousedown because it is closer to the top
        // of the canvas
        shapeBoundingBox.top = mousedown.y;
    } else {
 
        // Otherwise store mouse position
        shapeBoundingBox.top = loc.y;
    }
}


function UpdateRubberbandOnMove(loc){
    UpdateRubberbandSizeData(loc)
    drawRubberbandShape(loc)

}

function drawRubberbandShape(loc){
    ctx.strokeStyle = strokeColor
    ctx.fillColor = fillColor

    if(currentTool === "brush"){
        DrawBrush()
    } else if(currentTool === "line"){
        ctx.beginPath()
        ctx.moveTo( mousedown.x, mousedown.y)
        ctx.lineTo(loc.x, loc.y)
        ctx.stroke()
    } else if(currentTool === "rectangle") {
        ctx.strokeRect(shapeBoundingBox.left, shapeBoundingBox.top,  shapeBoundingBox.width,  shapeBoundingBox.height) 
    } else if(currentTool === "circle"){
        let radius = shapeBoundingBox.width
        ctx.beginPath()
        ctx.arc(mousedown.x, mousedown.y, radius, 0, Math.PI *2)
        ctx.stroke()
    } else if(currentTool === "ellipse"){
        let radiusX = shapeBoundingBox.width /2
        let radiusY = shapeBoundingBox.height /2
        ctx.beginPath()
        ctx.ellipse(mousedown.x, mousedown.y, radiusX, radiusY, Math.PI/4, 0, Math.PI*2)
        ctx.stroke()
    } else if(currentTool ===   "polygon"){
        ctx.beginPath()
        getPolygon()
        
        ctx.stroke()
    }

}


// y = Opposite Side
// Tan(Angle) = Opposite / Adjacent
// Angle = ArcTan(Opposite / Adjacent)
function getAngleUsingXAndY(mouselocX, mouselocY){
    let adjacent = mousedown.x - mouselocX;
    let opposite = mousedown.y - mouselocY;
 
    return radiansToDegrees(Math.atan2(opposite, adjacent));
}
 
function radiansToDegrees(rad){
    if(rad < 0){
        // Correct the bottom error by adding the negative
        // angle to 360 to get the correct result around
        // the whole circle
        return (360.0 + (rad * (180 / Math.PI))).toFixed(2);
    } else {
        return (rad * (180 / Math.PI)).toFixed(2);
    }
}
 
// Converts degrees to radians
function degreesToRadians(degrees){
    return degrees * (Math.PI / 180);
}
 
function ReactToMouseDown(e){
    // Change the mouse pointer to a crosshair
    canvas.style.cursor = "crosshair";
    // Store location 
    loc = GetMousePosition(e.clientX, e.clientY);
    // Save the current canvas image
    SaveCanvasImage();
    // Store mouse position when clicked
    mousedown.x = loc.x;
    mousedown.y = loc.y;
    // Store that yes the mouse is being held down
    dragging = true;

    if(currentTool === 'brush'){
        usingBrush =true
        AddBrushPoint(loc.x, loc.y)
    }

};
 
function ReactToMouseMove(e){
    canvas.style.cursor = "crosshair";
    loc = GetMousePosition(e.clientX, e.clientY);

    if(currentTool ==='brush' && dragging && usingBrush){
        if(loc.x > 0 && loc.x < canvasWidth && loc.y > 0 && loc.y < canvasHeight){
            AddBrushPoint(loc.x, loc.y)
        }
        RedrawCanvasImage()
        DrawBrush()
    } else {
        if (dragging) {
                RedrawCanvasImage()
                UpdateRubberbandOnMove(loc)
            }
    }
};
 
function ReactToMouseUp(e){
    canvas.style.cursor = "default";
    loc = GetMousePosition(e.clientX, e.clientY);
    RedrawCanvasImage();
    UpdateRubberbandOnMove(loc);
    dragging = false;
    usingBrush = false;
}

function getPolygon(){
    let polygonPoints = getPolygonPoints();
    ctx.beginPath();
    ctx.moveTo(polygonPoints[0].x, polygonPoints[0].y);
    for(let i = 1; i < polygonSides; i++){
        ctx.lineTo(polygonPoints[i].x, polygonPoints[i].y);
    }
    ctx.closePath();
}

function getPolygonPoints(){
    let angle = degreesToRadians(getAngleUsingXAndY(loc.x, loc.y))
    let radiusX = shapeBoundingBox.width
    let radiusY = shapeBoundingBox.height
    let polygonPoints = []
    
    // X = mouseloc.x + radiusX * Sin(angle)
    // Y = mouseloc.y + radiusY * Sin(angle)

    for (let i=0; i < polygonSides; i++) {
        polygonPoints.push(new PolygonPoint(loc.x + radiusX * Math.sin(angle), loc.y - radiusY * Math.cos(angle)))
        angle += 2 * Math.PI / polygonSides
    }
    return polygonPoints
}


function AddBrushPoint(x,y,mouseDown){
    brushXPoints.push(x)
    brushYPoints.push(y)
    brushDownPos.push(mouseDown)
}


function DrawBrush(){
    for(let i=1; i< brushXPoints.length; i++){
        ctx.beginPath();
        if(brushDownPos[i]){
                ctx.moveTo(brushXPoints[i-1], brushYPoints[i-1])
        } else {
            ctx.moveTo(brushXPoints[i]-1, brushYPoints[i]-1)
        }
        ctx.lineTo(brushXPoints[i], brushYPoints[i])
        ctx.closePath()
        ctx.stroke()
    }
}



// Saves the image in your default download directory
function SaveImage(){
    // Get a reference to the link element 
    var imageFile = document.getElementById("img-file");
    // Set that you want to download the image when link is clicked
    imageFile.setAttribute('download', 'image.png');
    // Reference the image in canvas for download
    imageFile.setAttribute('href', canvas.toDataURL());
}
 
function OpenImage(){
    let img = new Image();
    // Once the image is loaded clear the canvas and draw it
    img.onload = function(){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.drawImage(img,0,0);
    }
    img.src = 'image.png';
    
}
 
