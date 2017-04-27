// make sure html is loaded before running js
document.addEventListener("DOMContentLoaded", function() {

   //get canvas and palette divs from DOM
   let canvas = document.getElementById('canvas');
   let palette = document.getElementById('palette');

   // input my canvas size
   const myCanvasSize = 15;

   // create and append rows of pixels to canvas
   function createCanvas(size) {
      // create & append canvas rows
      for (let x = 0; x < size; x++) {
         let canvasRow = document.createElement('div');
         canvasRow.className = 'canvas-row';
         canvas.appendChild(canvasRow);
         // create & append canvas pixels
         for (let y = 0; y < size; y++) {
            let canvasPixel = document.createElement('div');
            canvasPixel.className = 'canvas-pixel';
            canvasRow.appendChild(canvasPixel);
         }
      }
   }
   // run create canvas function
   createCanvas(myCanvasSize);

   // get all canvas pixels from DOM
   let canvasPixels = document.getElementsByClassName('canvas-pixel');

   let currentBrushColor = document.createElement('div');
   currentBrushColor.className = `current-brush-color`;
   currentBrushColor.id = 'currentBrushColor';
   currentBrushColor.style.backgroundColor = '#000';
   palette.append(currentBrushColor);

   // get all palette cells
   let paletteCells = document.getElementsByClassName('palette-cell');

   /// watch color picker
   var colorPicker = document.getElementById('colorPicker');
   colorPicker.addEventListener("change", watchColorPicker);


   var userSelectedColor = '#000'; //defualt
   function watchColorPicker(event) {
      console.log('color has changed');
      currentBrushColor.style.backgroundColor = event.target.value;
      userSelectedColor = event.target.value;
      console.log(userSelectedColor);
   }

   // color canvas pixel
   var colorCanvasPixel = function(event) {
      this.style.backgroundColor = userSelectedColor;
   }


   // add event listener to all pixels, run change color on click
   for (let z = 0; z < canvasPixels.length; z++) {
      canvasPixels[z].addEventListener('click', watchColorPicker);
   }

   function checkMouseDown(event) {
      for (let z = 0; z < canvasPixels.length; z++) {
         canvasPixels[z].addEventListener('mouseenter', colorCanvasPixel);
      }
   }

   function checkMouseUp(event) {
      for (let q = 0; q < canvasPixels.length; q++) {
         canvasPixels[q].removeEventListener("mouseenter", colorCanvasPixel);
      }
   }

   canvas.addEventListener('mousedown', checkMouseDown);
   canvas.addEventListener('mouseup', checkMouseUp);


});
