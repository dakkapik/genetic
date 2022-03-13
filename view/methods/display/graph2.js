const matrixDisplay = document.getElementById("matrix");
const GRAPH_WIDTH = 800;
const GRAPH_HEIGHT = 800;
let columns = 12;
let rows = 12;
let obstacleRatio = 0;
let matrix = generateMatrixObstract(obstacleRatio);
// let matrix = <SOME MATRIX>

updateMatrixDisplay(matrix);

function generateMatrixObstract ( obstaclesRatio ) {
    const newMatrix = new Array(columns)
    for(let i = 0; i < columns; i++){
        const r = new Array(rows)
        newMatrix[i] = r
        for(let j = 0; j < rows; j++){
            if(obstaclesRatio) {
                if(Math.random() < obstaclesRatio){
                    newMatrix[i][j] = 'o';
                } else {
                    newMatrix[i][j] = '-';
                }
            } else {
                newMatrix[i][j] = '-';
            }
        }
    }
    return newMatrix;
}

function removeChilds (parent) {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    };
};

function displayCurrentChromosome (chromosome) {
    drawLine(chromosome)
    chromosome.forEach((gene, index) => {
        if(gene !== null){
            if(index === 0) document.getElementById(`${gene.x}-${gene.y}`).style.backgroundColor = "green"
            else if(index === chromosome.length - 1) document.getElementById(`${gene.x}-${gene.y}`).style.backgroundColor = "green"
            else document.getElementById(`${gene.x}-${gene.y}`).style.backgroundColor = "yellow"
        }
    });
}


function updateMatrixDisplay ( grid ) {
    removeChilds(matrixDisplay)
    for (let y = 0; y < grid.length; y++){
        const row = document.createElement("div");
        for(let x = 0; x < grid[0].length; x++){
            const cell = document.createElement("div");
            cell.id = `${x}-${y}`;
            cell.style.width = `${GRAPH_WIDTH / columns}px`;
            cell.style.height = `${GRAPH_HEIGHT / rows}px`;
            cell.innerHTML = (grid.length * y + x)
            cell.addEventListener("click", deltaObstacle)
            switch(grid[y][x]){
                case '-':
                    cell.className = "dirty"
                break;
                case 'o':
                    cell.className = "obstacle"
                break;
                case 'u':
                    cell.className = "open"
                break;
                case 'c':
                    cell.className = "closed"
                break;
                case 'x':
                    cell.className = "path"
                break;
                case 'n':
                    cell.className = "neigh"
                break;
                case 'k':
                    cell.className = "inaccessible"
                break;
            }
            row.append(cell);
        }
        matrixDisplay.append(row);
    }
    return grid
}

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
            cell.className = "dirty";
            matrix[y][x] = '-';
            break;
    }
};
    
function deltaConnector (e) {
    console.log(e.path[0].id)
    console.log(e.path[0].className)
}