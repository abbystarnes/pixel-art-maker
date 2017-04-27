// input: none/user clicks
// output: grid of divs that, when clicked, changed to selected color in color palette

// create grid of empty pixels
document.addEventListener("DOMContentLoaded", function() {

   // create grid
   let pixelGrid = document.getElementById('pixelGrid');

   function createGrid(size) {
      // create row
      for (let x = 0; x < size; x++) {
         let row = document.createElement('div');
         row.className = 'row';
         pixelGrid.appendChild(row);
         // create cells
         for (let y = 0; y < size; y++) {
            let pixel = document.createElement('div');
            pixel.className = 'pixel';
            row.appendChild(pixel);
         }
      }
   }

   createGrid(9);

   // get all pixels
   let pixels = document.getElementsByClassName('pixel');
   // get all palette colors
   let paletteColors = document.getElementsByClassName('palette-color');
   console.log(paletteColors);
   // change color function
   // set brush color to default
   var brushColor = ' red';

   // brush color indicator
   var currentColorIndicator = document.getElementById('currentColor');
   // set brush color to new color
   var changeBrushColor = function(event) {
      var newColor = this.className.split(" ")[1];
      brushColor = ` ${newColor}`;
      currentColorIndicator.className = `current-color ${newColor}`;

   }
   // add event listener to all palette colors, run change color on click
   for (let p = 0; p < paletteColors.length; p++) {
      paletteColors[p].addEventListener('click', changeBrushColor);
      //console.log(brushColor);
   }

   var colorPixel = function(event) {
      this.className += brushColor;
   }

   // add event listener to all pixels, run change color on click
   for (let z = 0; z < pixels.length; z++) {
      pixels[z].addEventListener('click', colorPixel);
   }


});


// if you click a color in palette, add set color equal to that color
