console.log("Hello World!");

const sand = 1;
const water = 2;
const rock = 3;

const colors = ["black", "yellow", "cyan"];

const rows = 50;
const columns = 50;

const width = 10;
const height = 10;

let currentX = 0;
let currentY = 0;
let mouseDown = false;
let validMouseInput = false;

const grid = [];
const stack = [];

const canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
let boundingRect = canvas.getBoundingClientRect();
let minX = Math.floor(boundingRect.left);
let minY = Math.floor(boundingRect.top);
let maxX = Math.floor(boundingRect.right);
let maxY = Math.floor(boundingRect.bottom);

function resetPositions() {
    boundingRect = canvas.getBoundingClientRect();
    minX = Math.floor(boundingRect.left);
    minY = Math.floor(boundingRect.top);
    maxX = Math.floor(boundingRect.right);
    maxY = Math.floor(boundingRect.bottom);
}

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

function createObject() {
    let rowNumber = Math.floor(currentX / width);
    let columnNumber = Math.floor(currentY / height);

    if (rowNumber >= rows) {
        rowNumber = rows - 1;
    }
    if (columnNumber >= columns) {
        columnNumber = columns - 1;
    }

    if (grid[rowNumber][columnNumber] == 0) {
        stack.push({type: sand, row: rowNumber, column: columnNumber});
        grid[rowNumber][columnNumber] = sand;
    }
}

function updateSand(index, r, c) {
    /*
    sand logic:
    - check bottom
    - check bottom left
    - check bottom right
    */

    const bottom = c + 1;
    const left = r - 1;
    const right = r + 1;

    /*check bottom*/
   if (grid[r][bottom] == 0) {
        grid[r][bottom] = sand;
        grid[r][c] = 0;
        stack[index].row = r;
        stack[index].column = bottom;
   }
   else if (left >= 0 && grid[left][bottom] == 0) {
        grid[left][bottom] = sand;
        grid[r][c] = 0;
        stack[index].row = left;
        stack[index].column = bottom;
   }
   else if(right < rows && grid[right][bottom] == 0 ) {
        grid[right][bottom] = sand;
        grid[r][c] = 0;
        stack[index].row = right;
        stack[index].column = bottom;
   }
   console.log(stack.length);
}

function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    resetPositions();
    if (validMouseInput) {
        createObject();
    }
    for (let i = 0; i < stack.length; i += 1) {

        switch (stack[i].type) {
            case sand:
                updateSand(i, stack[i].row, stack[i].column);
                break;
        }
        context.fillRect(stack[i].row * width, stack[i].column * height, width, height);
    }
}

createGrid();
setInterval(update, 50);