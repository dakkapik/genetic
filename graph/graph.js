let width = 1;
let height = 1;
let matrix = [
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-'],
];

const widthDisplay = document.getElementById("width-display");
const heightDisplay = document.getElementById("heigth-display");
const matrixDisplay = document.getElementById("matrix");

widthDisplay.innerHTML = width;
heightDisplay.innerHTML = height;

generateMatrix(matrix);

function updateMatrixDimensions(e){
    const [dimension, sign] = e.path[0].id.split('-');

    if(dimension === "width"){
        if(sign === "down" && !(width <= 1)){
            width --;
            matrix = updateMatrixValues();
        } else if(sign === "up"){
            width ++;
            matrix = updateMatrixValues();
        }
    } else {
        if(sign === "down" && !(height <= 1)){
            height --;
            matrix = updateMatrixValues();
        } else if(sign==="up") {
            height ++;
            matrix = updateMatrixValues();
        }
    }
    updateMatrixDisplay()
};

function generateMatrix (newMatrix) {
    if(newMatrix[0] == 0) return console.error("ERROR: matrix must have at least one cell")
    matrix = newMatrix;
    width = matrix[0].length
    height = matrix.length
    updateMatrixValues()
    updateMatrixDisplay()
};

function updateMatrixDisplay() {
    removeChilds(matrixDisplay);
    widthDisplay.innerHTML = width;
    heightDisplay.innerHTML = height;
    for(let y = 0; y < height; y++){
        const row = document.createElement("div");
        if(y < height - 1){}
        const midConnectors = document.createElement("div");
        midConnectors.className = "mid-connectors"
        for(let x = 0; x < width; x ++){
            const cell = document.createElement("div");
            cell.id = `${x}-${y}`;
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

            if(x < width - 1){
                const connectorEast = document.createElement("div");
                connectorEast.className = "connector-east";
                connectorEast.id = `${x}-${y}/${x + 1}-${y}`;
                connectorEast.addEventListener("click", deltaConnector);
                row.append(connectorEast);

                const midConnector = document.createElement("div");
                midConnector.className = "mid-connector";
                
                if(y < height - 1){
                    const connectorSouth = document.createElement("div");
                    connectorSouth.className = "south-connector";
                    connectorSouth.id = `${x}-${y}/${x}-${y + 1}`;
                    connectorSouth.addEventListener("click", deltaConnector);

                    const connectorSouthEast = document.createElement("div");
                    connectorSouthEast.className = "south-east-connector";
                    connectorSouthEast.id = `${x}-${y}/${x + 1}-${y + 1}`;
                    connectorSouthEast.addEventListener("click", deltaConnector);

                    const connectorSouthWest = document.createElement("div");
                    connectorSouthWest.className = "south-west-connector";
                    connectorSouthWest.id = `${x + 1}-${y}/${x}-${y + 1}`;
                    connectorSouthWest.addEventListener("click", deltaConnector);

                    midConnector.append(connectorSouth);
                    midConnector.append(connectorSouthWest);
                    midConnector.append(connectorSouthEast);
                }
                midConnectors.append(midConnector);
            };

            if(x === width - 1 && y < height - 1){
                const midConnector = document.createElement("div");
                midConnector.className = "mid-connector";

                const connectorSouth = document.createElement("div");
                connectorSouth.className = "south-connector";
                connectorSouth.id = `${x}-${y}/${x}-${y + 1}`;
                connectorSouth.addEventListener("click", deltaConnector);

                midConnector.append(connectorSouth)
                midConnectors.append(midConnector)
            }
        };

        matrixDisplay.append(row);
        matrixDisplay.append(midConnectors);
    }
}
    
function updateMatrixValues () {
    let newMatrix = [];
    for(let y = 0; y < height; y++){
        let newRow = [];
        for(let x = 0; x < width; x ++){
            if(matrix[y]){
                switch(matrix[y][x]){
                    case 'o':
                        newRow.push('o');
                    break;
                    case 'x':
                        newRow.push('x');
                    break;
                    default:
                        newRow.push('-');
                    break;
                };
            } else {
                newRow.push('-')
            }
        }
        newMatrix.push(newRow);
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
    
function deltaConnector (e) {
    console.log(e.path[0].id)
    console.log(e.path[0].className)
}

function removeChilds (parent) {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    };
};

