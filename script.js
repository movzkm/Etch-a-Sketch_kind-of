console.log("Hello World!");

const sand = 1;
const water = 2;
const rock = 3;

const rows = 50;
const columns = 50;

const grid = [];

const fallingContainer = document.querySelector("fallingContainer");

/*
logic:
- we have a total of rows * columns boxes
- when the player press on the are specified an object is inserted
- 
*/

function createGrid() {
    /*
        creating the 2d array
    */
   for (let i = 0; i < rows; i += 1) {
    grid[i] = [];
    for (let j = 0; j < columns ; j += 1) {
        grid[i][j] = 0;
    }
   }
}

createGrid();