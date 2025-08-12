console.log("Hello World!");

const sand = 1;
const water = 2;
const rock = 3;

const rows = 50;
const columns = 50;

let currentX = 0;
let currentY = 0;
let mouseDown = false;
let validMouseInput = false;

const grid = [];
const stack = [];

const canvas = document.querySelector("#canvas");
const boundingRect = canvas.getBoundingClientRect();
const minX = Math.floor(boundingRect.left);
const minY = Math.floor(boundingRect.top);
const maxX = Math.floor(boundingRect.right);
const maxY = Math.floor(boundingRect.bottom);

const context = canvas.getContext("2d");

const inputChecker = document.querySelector("#inputChecker");

/*
logic:
- we have a total of rows * columns boxes
- when the player press on the area specified an object is inserted
- and the logic for the particles start
- a stack containing the objects inserted and their positions
- the stack is used to update the positions of objects and the grid

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

function setPosition(x, y) {

    if (mouseDown && minX <= x && x <= maxX 
        && minY <= y && y <= maxY) {
        currentX = x - minX;
        currentY = y - minY;
        mouseDown = true;
        validMouseInput = true;
    }
    else {
        validMouseInput = false;
    }
}

document.querySelector("html").addEventListener("mousedown", event => {
    mouseDown = true;
    setPosition(event.clientX, event.clientY);
    update();
})

document.querySelector("html").addEventListener("mouseup", event => {
    mouseDown = false;
    validMouseInput = false;
})

document.querySelector("html").addEventListener("mousemove", event => {
    setPosition(event.clientX, event.clientY);
})


function update() {
    if (validMouseInput) {
        inputChecker.textContent = "valid";
    }
    else {
        inputChecker.textContent = "INVALID";
    }
}

createGrid();
setInterval(update, 250);