// make sure html is loaded before running js
document.addEventListener("DOMContentLoaded", function() {

   //get canvas and palette divs from DOM
   let canvas = document.getElementById('canvas');
   let palette = document.getElementById('palette');

   // input my canvas size and my palette colors
   const myPaletteColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
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

   // run create palette
   function createPallete(paletteColors) {
      for (let c = 0; c < paletteColors.length; c++) {
         let paletteCell = document.createElement('div');
         let paletteColor = paletteColors[c];
         paletteCell.className = `palette-cell ${paletteColor}`;
         palette.append(paletteCell);
      }
   }
   // run create palette function
   createPallete(myPaletteColors);

   let currentBrushColor = document.createElement('div');
   currentBrushColor.className = `current-brush-color red`;
   currentBrushColor.id = 'currentBrushColor';
   palette.append(currentBrushColor);

   // get all palette cells
   let paletteCells = document.getElementsByClassName('palette-cell');

   // make brush color & set to default
   var brushColor = ' red';

   // make current brush color indicator & set to default
   //  var currentBrushColor = document.getElementById('currentBrushColor');
   //  currentBrushColor.className = `current-brush-color red`;

   // set brush color to new color, update current brush color indicator
   var changeBrushColor = function(event) {
      var newColor = this.className.split(" ")[1];
      brushColor = ` ${newColor}`;
      currentBrushColor.className = `current-brush-color ${newColor}`;
   }

   /// watch color picker
   var colorPicker = document.getElementById('colorPicker');
   colorPicker.addEventListener("change", watchColorPicker);

   function watchColorPicker(event) {
      console.log('color has changed');
      currentBrushColor.style.backgroundColor = event.target.value;
   }


   // add event listener to all palette colors, run change brush color on click
   for (let p = 0; p < paletteCells.length; p++) {
      paletteCells[p].addEventListener('click', changeBrushColor);
   }

   // color canvas pixel
   var colorCanvasPixel = function(event) {
      this.className = `canvas-pixel ${brushColor}`;
   }


   // add event listener to all pixels, run change color on click
   for (let z = 0; z < canvasPixels.length; z++) {
      canvasPixels[z].addEventListener('click', colorCanvasPixel);
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
