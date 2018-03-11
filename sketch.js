//-----------------------------------------------------\\
function make2DArray(cols, rows) {

  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
//-----------------------------------------------------\\


/* GLOBAL VARIABLES */
let grid;
let cols;
let rows;
let resolution = 20;
var button;
let goPressed = false;

class cell {
  constructor(alive,age) {
    this.alive = alive;
    this.age = age;
  }
};

//-----------------------------------------------------\\
function setup() {
  var myCanvas = createCanvas(windowWidth,windowHeight);
  myCanvas.parent('p5Canvas');
  cols = floor(width / resolution);
  rows = floor(height / resolution);
  grid = make2DArray(cols,rows);
  button = createButton('Go!');
  button.mousePressed(go);
  frameRate(10);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      //grid[i][j] = new cell(floor(random(2)),0);
      grid[i][j] = floor(random(2));
    }
  }
}
//-----------------------------------------------------\\

function go() {
  goPressed = true;
}


//-----------------------------------------------------\\
function draw() {
  background(255);
  if (mouseIsPressed && mouseX >= 0 && mouseX < width) {
    if (grid[floor(mouseX/resolution)][floor(mouseY/resolution)] == 1){
      grid[floor(mouseX/resolution)][floor(mouseY/resolution)] = 0;
    } else {
      grid[floor(mouseX/resolution)][floor(mouseY/resolution)] = 1;
    }
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(0);
        stroke(255);
        rect(x, y, resolution - 1 , resolution - 1);
      }

    }
  }
  if(goPressed) {
  let next = make2DArray(cols,rows);
  // fill each spot in new 2D array with dead cells
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      next[i][j] = new cell(0,0);
    }
  }

  // compute next based on the current grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // count live neighbors
      let state = grid[i][j];
        let neighbors = countNeighbors(grid, i, j);
        if (state == 0 && neighbors == 3) {
          next[i][j] = 1;
        } else if (state == 1 && (neighbors < 2 || neighbors > 3) ) {
          next[i][j] = 0;
        } else {
          next[i][j] = state;
        }
    }
  }
  grid = next;
}
}
//-----------------------------------------------------\\



//-----------------------------------------------------\\
function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}
//-----------------------------------------------------\\
