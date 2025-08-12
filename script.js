console.log("Hello World!");

const sand = 1;
const water = 2;
const rock = 3;

const rows = 50;
const columns = 50;

let currentX = 0;
let currentY = 0;

const grid = [];

const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

/*
logic:
- we have a total of rows * columns boxes
- when the player press on the are specified an object is inserted
- and the logic for the particles start

problems:
- how to create the divs
- how to access them

i guess we just need to use canvas
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

let mouseDown = false;

function printMouseLocation() {
    if (mouseDown) {
        console.log("x: " + currentX + " y: " + currentY);
    }
}

document.querySelector("#canvas").addEventListener("mousedown", event => {
    currentX = event.clientX;
    currentY = event.clientY;
    mouseDown = true;
})

document.querySelector("#canvas").addEventListener("mouseup", event => {
    mouseDown = false;
})

document.querySelector("#canvas").addEventListener("mousemove", event => {
    if (mouseDown) {
        currentX = event.clientX;
        currentY = event.clientY;
    }
})
