const matrixDisplay = document.getElementById("matrix");
const graphWidth = 800
const graphHeight = 800
let columns = 1;
let rows = 1;
let matrix = [["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],["u","u","u","u","u","u","u","u","u","u","u","u","u","u","u","u","u","u","u","u","u","u","u","u","u","u","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","u","x"],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","x"]]

const widthDisplay = document.getElementById("width-display");
const heightDisplay = document.getElementById("heigth-display");

widthDisplay.innerHTML = columns;
heightDisplay.innerHTML = rows;

generateMatrix(matrix);

function updateMatrixDimensions(e){
    const [dimension, sign] = e.path[0].id.split('-');

    if(dimension === "width"){
        if(sign === "down" && !(columns <= 1)){
            columns --;
            matrix = updateMatrixValues();
        } else if(sign === "up"){
            columns ++;
            matrix = updateMatrixValues();
        }
    } else {
        if(sign === "down" && !(rows <= 1)){
            rows --;
            matrix = updateMatrixValues();
        } else if(sign==="up") {
            rows ++;
            matrix = updateMatrixValues();
        }
    }
    updateMatrixDisplay()
};

function generateMatrix (newMatrix) {
    if(newMatrix[0] == 0) return console.error("ERROR: matrix must have at least one cell")
    matrix = newMatrix;
    columns = matrix[0].length
    rows = matrix.length
    updateMatrixValues()
    updateMatrixDisplay()
};

function displayCurrentChromosome (chromosome) {
    chromosome.forEach(gene => {
        document.getElementById(`${gene.x}-${gene.y}`).style.backgroundColor = "yellow"
    });
}

function updateMatrixDisplay() {
    removeChilds(matrixDisplay);
    
    for(let y = 0; y < rows; y++){
        const row = document.createElement("div");
        const midConnectors = document.createElement("div");
        midConnectors.className = "mid-connectors"
        for(let x = 0; x < columns; x ++){
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
                case 'u':
                    cell.className = "open";
                break;
                case 'c':
                    cell.className = "closed";
                break;
            };
            cell.addEventListener("click", deltaObstacle);
            row.append(cell);

            if(x < columns - 1){
                const connectorEast = document.createElement("div");
                connectorEast.className = "connector-east";
                connectorEast.id = `${x}-${y}/${x + 1}-${y}`;
                connectorEast.addEventListener("click", deltaConnector);
                row.append(connectorEast);

                const midConnector = document.createElement("div");
                midConnector.className = "mid-connector";
                
                if(y < rows - 1){
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

            if(x === columns - 1 && y < rows - 1){
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
    for(let y = 0; y < rows; y++){
        let newRow = [];
        for(let x = 0; x < columns; x ++){
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

