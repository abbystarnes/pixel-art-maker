// BEGIN MY CODE


// make sure html is loaded before running js
document.addEventListener('DOMContentLoaded', () => {
   // get canvas and palette divs from DOM
  const canvas = document.getElementById('canvas');
  const palette = document.getElementById('palette');

   // input my canvas size
  const myCanvasSize = 15;

   // create and append rows of pixels to canvas
  function createCanvas(size) {
      // create & append canvas rows
    for (let x = 0; x < size; x += 1) {
      const canvasRow = document.createElement('div');
      canvasRow.className = 'canvas-row';
      canvas.appendChild(canvasRow);
         // create & append canvas pixels
      for (let y = 0; y < size; y += 1) {
        const canvasPixel = document.createElement('div');
        canvasPixel.className = 'canvas-pixel';
        canvasRow.appendChild(canvasPixel);
      }
    }
  }
   // run create canvas function
  createCanvas(myCanvasSize);

   // get all canvas pixels from DOM
  const canvasPixels = document.getElementsByClassName('canvas-pixel');

  const currentBrushColor = document.createElement('div');
  currentBrushColor.className = 'current-brush-color';
  currentBrushColor.id = 'currentBrushColor';
  currentBrushColor.style.backgroundColor = '#000';
  palette.append(currentBrushColor);

   // / watch color picker
  const colorPicker = document.getElementById('colorPicker');


  let userSelectedColor = '#000'; // default
  function watchColorPicker(event) {
    currentBrushColor.style.backgroundColor = event.target.value;
    if (event.target.value !== undefined) {
      userSelectedColor = event.target.value;
    }
  }

  colorPicker.addEventListener('change', watchColorPicker);

   // color canvas pixel
  function colorCanvasPixel() {
    this.style.backgroundColor = userSelectedColor;
  }

  for (let z = 0; z < canvasPixels.length; z += 1) {
    canvasPixels[z].addEventListener('click', watchColorPicker);
  }

  function checkMouseDown() {
    for (let z = 0; z < canvasPixels.length; z += 1) {
      canvasPixels[z].addEventListener('mouseenter', colorCanvasPixel);
    }
  }

  function checkMouseUp() {
    for (let q = 0; q < canvasPixels.length; q += 1) {
      canvasPixels[q].removeEventListener('mouseenter', colorCanvasPixel);
    }
  }

  canvas.addEventListener('mousedown', checkMouseDown);
  canvas.addEventListener('mouseup', checkMouseUp);

  const buttonSave = document.getElementById('save');
  const buttonLoad = document.getElementById('load');
  const buttonClear = document.getElementById('clearButton');


  let saveString = [];

  function saveMyDrawing() {
    saveString = [];
    for (let x = 0; x < canvasPixels.length; x += 1) {
      saveString.push(canvasPixels[x].style.backgroundColor);
    }
    saveString = JSON.stringify(saveString);
  }

  function loadMyDrawing() {
    let loadString = '';
    loadString = JSON.parse(saveString);
    for (let m = 0; m < canvasPixels.length; m += 1) {
      canvasPixels[m].style.backgroundColor = loadString[m];
    }
  }

  function clearMyDrawing() {
    for (let m = 0; m < canvasPixels.length; m += 1) {
      canvasPixels[m].style.backgroundColor = '#fff';
    }
  }

  buttonSave.addEventListener('click', saveMyDrawing);
  buttonLoad.addEventListener('click', loadMyDrawing);
  buttonClear.addEventListener('click', clearMyDrawing);

  const fillButton = document.getElementById('fillButton');


  let originalNodeColor = 'rgb(255, 255, 255)';

  function floodFill(nodule) {
    const myNode = nodule;
    if (myNode.style.backgroundColor === currentBrushColor.style.backgroundColor) {
      return;
    } else if (myNode.style.backgroundColor !== originalNodeColor) {
      return;
    }
    myNode.style.backgroundColor = currentBrushColor.style.backgroundColor;

    for (let d = 0; d < canvasPixels.length; d += 1) {
      if (canvasPixels[d] === myNode) {
        const leftPixel = canvasPixels[d - 1];
        const rightPixel = canvasPixels[d + 1];
        const upPixel = canvasPixels[d - 15];
        const downPixel = canvasPixels[d + 15];

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


      // return to original click event listener
    for (let z = 0; z < canvasPixels.length; z += 1) {
      canvasPixels[z].addEventListener('click', watchColorPicker);
      canvasPixels[z].removeEventListener('click', floodFill);
    }
  }

  function grandFloodFill() {
    originalNodeColor = this.style.backgroundColor;
    floodFill(this);
  }

  function changeListener() {
    for (let z = 0; z < canvasPixels.length; z += 1) {
      canvasPixels[z].removeEventListener('click', watchColorPicker);
      canvasPixels[z].addEventListener('click', grandFloodFill);
    }
  }

  fillButton.addEventListener('click', changeListener);
});
