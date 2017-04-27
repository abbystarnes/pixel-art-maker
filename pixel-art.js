// input: none/user clicks
// output: grid of divs that, when clicked, changed to selected color in color palette

// create grid of empty pixels
document.addEventListener("DOMContentLoaded", function() {

   function createGrid(size) {
      let pixelGrid = document.getElementById('pixelGrid');
      console.log(pixelGrid, 'a');
      for (let x = 0; x < size; x++) {
         let row = document.createElement('div');
         row.className = 'row';
         pixelGrid.appendChild(row);
         for (let y = 0; y < size; y++) {
            let pixel = document.createElement('div');
            pixel.className = 'pixel';
            row.appendChild(pixel);
         }
      }
   }

   createGrid(2);

});

// var imgLog = function() {
//    console.log("You moused over Mega Man!");
// }
//
// document.addEventListener("DOMContentLoaded", function() {
//    var img = document.querySelector('img');
//    img.addEventListener('mouseover', imgLog);
// });
