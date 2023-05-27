// 2D Water Ripples
// Algorithm: https://web.archive.org/web/20160418004149/http://freespace.virgin.net/hugo.elias/graphics/x_water.htm

// Declaration of variables
let cols;
let rows;
let current; // Represents the current state of the water ripples
let previous; // Represents the previous state of the water ripples

let dampening = 0.99; // Controls the damping effect on the ripples

function setup() {
  pixelDensity(1); // Sets the pixel density of the canvas
  createCanvas(600, 400); // Creates a canvas with dimensions 600x400
  cols = width; // Sets the number of columns equal to the width of the canvas
  rows = height; // Sets the number of rows equal to the height of the canvas

  // Initialize the current and previous arrays with zeros
  current = new Array(cols).fill(0).map(n => new Array(rows).fill(0));
  previous = new Array(cols).fill(0).map(n => new Array(rows).fill(0));
}

// Event handler for mouse dragging
function mouseDragged() {
  previous[mouseX][mouseY] = 2500; // Sets the value of the previous state at the mouse position
}

function draw() {
  background(0); // Sets the background color to black

  loadPixels(); // Loads the pixel data of the canvas

  // Nested loops to update the current state based on the previous state
  for (let i = 1; i < cols - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
      // Update the current state using the algorithm for water ripples
      current[i][j] =
        (previous[i - 1][j] +
          previous[i + 1][j] +
          previous[i][j - 1] +
          previous[i][j + 1]) /
          2 -
        current[i][j];
      
      // Apply damping to the current state
      current[i][j] = current[i][j] * dampening;

      // Calculate the index of the pixel in the pixels array
      // and set the color values of the pixel
      let index = (i + j * cols) * 4;
      pixels[index + 0] = current[i][j]; // Red component
      pixels[index + 1] = current[i][j]; // Green component
      pixels[index + 2] = current[i][j]; // Blue component
    }
  }

  updatePixels(); // Updates the canvas with the modified pixel data

  // Swap the current and previous arrays
  let temp = previous;
  previous = current;
  current = temp;
}
