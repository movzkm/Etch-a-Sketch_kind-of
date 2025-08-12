console.log("Hello World!");

const sand = 1;
const water = 2;

const colors = ["black", "yellow", "cyan"];

const canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");

canvas.width = 750;
canvas.height = 750;

const width = 5;
const height = 5;

const xPositions = Math.floor(canvas.width / width);
const yPositions = Math.floor(canvas.height / height);

let currentX = 0;
let currentY = 0;
let mouseDown = false;
let validMouseInput = false;

const grid = [];
const stack = [];

let selectedType = sand;

document.querySelector("#sand").addEventListener("click", () => {
    selectedType = sand;
})
document.querySelector("#water").addEventListener("click", () => {
    
})

function resetPositions() {
    boundingRect = canvas.getBoundingClientRect();
    minX = Math.floor(boundingRect.left);
    minY = Math.floor(boundingRect.top);
    maxX = Math.floor(boundingRect.right);
    maxY = Math.floor(boundingRect.bottom);
}

/*
logic:
- we have a total of xPositions * yPositions boxes
- when the player press on the area specified an object is inserted
- and the logic for the particles start
- a stack containing the objects inserted and their positions
- the stack is used to update the positions of objects and the grid
*/

function createGrid() {
    /*
        creating the 2d array
    */
   for (let i = 0; i < xPositions; i += 1) {
    grid[i] = [];
    for (let j = 0; j < yPositions ; j += 1) {
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
    let xPosition = Math.floor(currentX / width);
    let yPosition = Math.floor(currentY / height);

    if (xPosition >= xPositions) {
        xPosition = xPositions - 1;
    }
    if (yPosition >= yPositions) {
        yPosition = yPositions - 1;
    }

    if (grid[xPosition][yPosition] == 0) {
        stack.push({type: selectedType, x: xPosition, y: yPosition});
        grid[xPosition][yPosition] = selectedType;
    }
}

function updateSand(index, xIn, yIn) {
    /*
    sand logic:
    - check bottom
    - check bottom left
    - check bottom right
    */

    const bottom = yIn + 1;
    const left = xIn - 1;
    const right = xIn + 1;

    /*check bottom*/
   if (grid[xIn][bottom] == 0) {
        grid[xIn][bottom] = sand;
        grid[xIn][yIn] = 0;
        stack[index].x = xIn;
        stack[index].y = bottom;
   }
   else if (left >= 0 && grid[left][bottom] == 0) {
        grid[left][bottom] = sand;
        grid[xIn][yIn] = 0;
        stack[index].x = left;
        stack[index].y = bottom;
   }
   else if(right < xPositions && grid[right][bottom] == 0 ) {
        grid[right][bottom] = sand;
        grid[xIn][yIn] = 0;
        stack[index].x = right;
        stack[index].y = bottom;
   }
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
                updateSand(i, stack[i].x, stack[i].y);
                break;
        }
        context.fillStyle = colors[stack[i].type];
        context.fillRect(stack[i].x * width, stack[i].y * height, width, height);
    }
}

createGrid();
setInterval(update, 10);