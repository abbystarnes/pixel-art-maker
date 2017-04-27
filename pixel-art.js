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
      console.log(userSelectedColor, 'color');
      if (event.target.value !== undefined) {
         userSelectedColor = event.target.value;
      }
      console.log(userSelectedColor, 'color');
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
         console.log('mouse enter running');
      }
   }

   function checkMouseUp(event) {
      for (let q = 0; q < canvasPixels.length; q++) {
         canvasPixels[q].removeEventListener("mouseenter", colorCanvasPixel);
         console.log('mouse enter removed');
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



   // return string to document



   //session storage
   // sessionStorage.setItem('key', 'value');
   //
   // // Get saved data from sessionStorage
   // var data = sessionStorage.getItem('key');
   //
   // // Remove saved data from sessionStorage
   // sessionStorage.removeItem('key');
   //
   // // Remove all saved data from sessionStorage
   // sessionStorage.clear();


   // stringify
   //  JSON.stringify(value[, replacer[, space]])

   // take string and return original types
   // JSON.parse(text[, reviver])
});
