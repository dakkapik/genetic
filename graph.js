let width = 1;
let height = 1;
// let matrix = [['-']];
let matrix = matrix1()
const matrixDisplay = document.getElementById("matrix");
const widthDisplay = document.getElementById("width-display");
const heightDisplay = document.getElementById("heigth-display");
const getMatrixButton = document.getElementById("get-matrix-button");
const widthUpButton = document.getElementById("width-up-button");
const widthDownButton = document.getElementById("width-down-button");
const heightUpButton = document.getElementById("heigth-up-button");
const heightDownButton = document.getElementById("heigth-down-button");

widthDisplay.innerHTML = width;
heightDisplay.innerHTML = height;

widthUpButton.addEventListener("click", updateMatrix);
widthDownButton.addEventListener("click", updateMatrix);
heightUpButton.addEventListener("click", updateMatrix);
heightDownButton.addEventListener("click", updateMatrix);

getMatrixButton.addEventListener("click", () => console.log(matrix));

generateMatrix(matrix);

function updateMatrix(e){
    const [dimension, sign] = e.path[0].id.split('-');

    if(dimension === "width"){
        if(sign === "down" && !(width <= 1)){
            width --;
            widthDisplay.innerHTML = width;
            matrix = updateMatrixDimensions(dimension, sign);
        } else if(sign === "up"){
            width ++;
            widthDisplay.innerHTML = width;
            matrix = updateMatrixDimensions(dimension, sign);
        }
    } else {
        if(sign === "down" && !(height <= 1)){
            height --;
            heightDisplay.innerHTML = height;
            matrix = updateMatrixDimensions(dimension, sign);
        } else if(sign==="up") {
            height ++;
            heightDisplay.innerHTML = height;
            matrix = updateMatrixDimensions(dimension, sign);
        }
    }
};

function generateMatrix (matrix) {
    removeChilds(matrixDisplay);
    width = matrix[0].length;
    widthDisplay.innerHTML = width;
    height = matrix.length;
    heightDisplay.innerHTML = height;
    for(let y = 0; y < height; y++){
        const row = document.createElement("div");
        for(let x = 0; x < width; x ++){
            const cell = document.createElement("div");

            cell.id = `${x}-${y}`;
            if(matrix[y][x] === 'o') cell.className = "obstacle";
            else cell.className = "dirty";

            cell.addEventListener("click", deltaObstacle);
            row.append(cell);
        }
        matrixDisplay.append(row);
    };
};
    
function updateMatrixDimensions () {
    removeChilds(matrixDisplay);
    let newMatrix = [];
    for(let y = 0; y < height; y++){
        let newRow = []
        const row = document.createElement("div");
        for(let x = 0; x < width; x ++){
            newRow.push("-");
            const cell = document.createElement("div");
            cell.id = `${x}-${y}`;
            // THIS FUNCTION NEEDS TO BE FIXED, BREAKS UPDATE METHOD
            switch(matrix[y][x]){
                case '-':
                    cell.className = "dirty";
                break;
                case 'o':
                    cell.className = "obstacle";
                break;
                case 'x':
                    cell.className = "clean";
                break;
            };
            cell.addEventListener("click", deltaObstacle);
            row.append(cell);
        }
        newMatrix.push(newRow);
        matrixDisplay.append(row);
    }
    return newMatrix;
};
    
function deltaObstacle (e) {
    const cell = document.getElementById(e.path[0].id);
    const [x, y] = e.path[0].id.split('-');
    
    switch(cell.className){
        case "dirty":
            cell.className = "obstacle";
            matrix[y][x] = 'o';
            break;
        case "obstacle":
            cell.className = "dirty";
            matrix[y][x] = '-';
        break;
        case "clean":
            return console.log("cannot change clean cell");
        default:
            return console.log("unknown cell identity");
    }
};
    
function removeChilds (parent) {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    };
};

function matrix1 () { return [
    [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-"
    ],
    [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-"
    ],
    [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-"
    ],
    [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-"
    ],
    [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-"
    ],
    [
        "-",
        "-",
        "-",
        "o",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-"
    ],
    [
        "-",
        "-",
        "-",
        "o",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-"
    ],
    [
        "-",
        "-",
        "-",
        "o",
        "o",
        "o",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-"
    ],
    [
        "-",
        "-",
        "-",
        "o",
        "o",
        "o",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-"
    ],
    [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-"
    ],
    [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "o",
        "o",
        "-",
        "-",
        "-"
    ],
    [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "o",
        "o",
        "-",
        "-",
        "-"
    ],
    [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "o",
        "o",
        "-",
        "-",
        "-"
    ],
    [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-"
    ],
    [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-"
    ],
    [
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-"
    ]
]}