//BEGIN MY CODE


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
   //let paletteCells = document.getElementsByClassName('palette-cell');

   /// watch color picker
   var colorPicker = document.getElementById('colorPicker');
   colorPicker.addEventListener("change", watchColorPicker);


   var userSelectedColor = '#000'; //default
   function watchColorPicker(event) {
      currentBrushColor.style.backgroundColor = event.target.value;
      //console.log(userSelectedColor, 'color');
      if (event.target.value !== undefined) {
         userSelectedColor = event.target.value;
      }
      //console.log(userSelectedColor, 'color');
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
      // if (event.target.className != 'canvas-row') {
      //    event.target.style.backgroundColor = userSelectedColor;
      // }
      for (let z = 0; z < canvasPixels.length; z++) {
         canvasPixels[z].addEventListener('mouseenter', colorCanvasPixel);

      }
   }

   function checkMouseUp(event) {
      // if (event.target.className != 'canvas-row') {
      //    event.target.style.backgroundColor = userSelectedColor;
      // }
      for (let q = 0; q < canvasPixels.length; q++) {
         canvasPixels[q].removeEventListener("mouseenter", colorCanvasPixel);
         //console.log('mouse enter removed');
      }
   }

   canvas.addEventListener('mousedown', checkMouseDown);
   canvas.addEventListener('mouseup', checkMouseUp);


   // use local storage, JSON.stringify, and JSON.parse to put drawing into local storage
   // Save data to sessionStorage

   // drawing consists of pixels with inline background color value
   // store all pixels in a string w/stringify

   // identify pixels content
   // click save = convert pixel content to a string (stringify)
   // click load = revert pixel content to object, reload in DOM/html
   //console.log(canvasPixels, 'pixels');
   //console.log(canvasPixel);
   var buttonSave = document.getElementById('save');
   var buttonLoad = document.getElementById('load');
   var buttonClear = document.getElementById('clearButton');

   buttonSave.addEventListener('click', saveMyDrawing);
   buttonLoad.addEventListener('click', loadMyDrawing);
   buttonClear.addEventListener('click', clearMyDrawing);

   var saveString = [];

   function saveMyDrawing() {
      saveString = [];
      for (let x = 0; x < canvasPixels.length; x++) {
         saveString.push(canvasPixels[x].style.backgroundColor);
      }
      //console.log(saveString, 'before stringify');
      saveString = JSON.stringify(saveString);
      //console.log(saveString, 'after stringify');
   }

   function loadMyDrawing() {
      var loadString = '';
      loadString = JSON.parse(saveString);
      //console.log(loadString, 'after load');
      for (let m = 0; m < canvasPixels.length; m++) {
         canvasPixels[m].style.backgroundColor = loadString[m];
      }
   }

   function clearMyDrawing() {
      for (let m = 0; m < canvasPixels.length; m++) {
         canvasPixels[m].style.backgroundColor = '#fff';
      }
   }

   // flood fill implementation

   // if you click fill button:
   // remove watchColor event listener from pixels
   // add fill event listener to pixels
   var fillButton = document.getElementById('fillButton');

   function changeListener(event) {
      // console.log(this, 'this');
      // console.log(event.target, 'event target');
      for (let z = 0; z < canvasPixels.length; z++) {
         canvasPixels[z].removeEventListener('click', watchColorPicker);
         canvasPixels[z].addEventListener('click', grandFloodFill);
      }
      console.log('done changing listeners');
   }

   fillButton.addEventListener('click', changeListener);

   // need a way to find pixel above current pixel, beside it, beneath it, etc

   // pixel above = pixel[x] - row length
   // pixel below = pixel[x] + row length
   // pixel left = array pixel[x] - 1
   // pixel right = array pixel [x] + 1
   var originalNodeColor = 'rgb(255, 255, 255)';


   function grandFloodFill(event) {
      //console.log('grand running');
      originalNodeColor = this.style.backgroundColor;
      console.log(originalNodeColor, 'original color');
      floodFill(this);
   }

   //  Flood-fill (node, target-color, replacement-color):
   function floodFill(node) {
      //console.log(node, 'node');
      //   1. If target-color is equal to replacement-color, return.
      //  console.log(node, 'node');
      // for (let z = 0; z < canvasPixels.length; z++) {
      //    if (this === canvasPixels[z]) {
      //    }
      // }

      // console.log(this.style.backgroundColor, 'pixel');
      // console.log(currentBrushColor.style.backgroundColor, 'user');

      ////// IMPLEMENT THESE CHECKS
      if (node.style.backgroundColor === currentBrushColor.style.backgroundColor) {
         //console.log('already matches');
         return;
      } else if (node.style.backgroundColor !== originalNodeColor) {
         //console.log("it doesn't match original color");
         return;
      } else {
         node.style.backgroundColor = currentBrushColor.style.backgroundColor;

         for (let d = 0; d < canvasPixels.length; d++) {
            if (canvasPixels[d] === node) {
               //console.log(canvasPixels[d], 'canvas pixel d is node');
               var leftPixel = canvasPixels[d - 1];
               var rightPixel = canvasPixels[d + 1];
               var upPixel = canvasPixels[d - 15];
               var downPixel = canvasPixels[d + 15];

               if (leftPixel !== undefined) {
                  floodFill(leftPixel);
               }
               if (rightPixel !== undefined) {
                  floodFill(rightPixel);
               }
               if (upPixel !== undefined) {
                  floodFill(upPixel);
               }
               if (downPixel !== undefined) {
                  floodFill(downPixel);
               }
            }
         }
      }

      //       var tiny = tinycolor(color);
      // var hexString=  tiny.toHexString();
      // var hex8String=  tiny. tiny.toHex8String();
      // and there are other similar methods
      //
      // tiny.toRgbString()
      // tiny.toHslString()
      // tiny.toHsvString()
      // tiny.toName()
      // tiny.getFormat()

      // if (targetColor === replacementColor) {
      //    return;
      // }
      // //2. If the color of node is not equal to target-color, return.
      // else if (colorofnode !== targetColor) {
      //    return;
      // } else {
      //    colorofnode = replacementColor
      //    floodFill(pixelLeft)
      //    floodFill(pixelRight)
      //    floodFill(pixelUp)
      //    floodFill(pixelDown)
      // }

      //return
      for (let z = 0; z < canvasPixels.length; z++) {
         canvasPixels[z].addEventListener('click', watchColorPicker);
         canvasPixels[z].removeEventListener('click', floodFill);
      }
      return
      //   3. Set the color of node to replacement-color.
      //   4. Perform Flood-fill (one step to the south of node, target-color, replacement-color).
      //      Perform Flood-fill (one step to the north of node, target-color, replacement-color).
      //      Perform Flood-fill (one step to the west of node, target-color, replacement-color).
      //      Perform Flood-fill (one step to the east of node, target-color, replacement-color).
      //   5. Return.
   }
});
