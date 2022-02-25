const matrixDisplay = document.getElementById("matrix");
const GRAPH_WIDTH = 800;
const GRAPH_HEIGHT = 800;
let columns = 28;
let rows = 28;
let obstacleRatio = 0.2;
let matrix = generateMatrixObstract(obstacleRatio);
updateMatrixDisplay(matrix);


// const updateMatrixDimensions = (e) => {
//     const [ dimension, sign ] = e.path[0].id.split('-');
//     if(dimension === "columns"){
//         if(sign === "up"){
//             columns ++;
//         } else {
//             columns --;
//         }
//     } else {
//         if(sign === "up"){
//             columns ++;
//         } else {
//             rows --;
//         }
//     }
//     updateMatrixValues();
//     updateMatrixDisplay();
// }

// const importMatrix = ( matrix ) => {
//     columns = matrix[0].length
//     rows = matrix.length
// }

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

function updateMatrixDisplay ( matrix ) {
    removeChilds(matrixDisplay)
    for (let y = 0; y < matrix.length; y++){
        const row = document.createElement("div");
        for(let x = 0; x < matrix[0].length; x++){
            const cell = document.createElement("div");
            cell.id = `${x}-${y}`;
            cell.style.width = `${GRAPH_WIDTH / columns}px`;
            cell.style.height = `${GRAPH_HEIGHT / rows}px`;
            switch(matrix[y][x]){
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
            }
            row.append(cell);
        }
        matrixDisplay.append(row);
    }
}