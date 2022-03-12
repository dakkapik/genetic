let history = [];
let historyLength = 40;
const postMatrixButton = document.getElementById("post-matrix-button");
const getMatrixButton = document.getElementById("get-matrix-button");
const setIterationsButton = document.getElementById("set-iteration-button");
const iterarionInput = document.getElementById("iteration-select");
const historySlider = document.getElementById("history-slider");
const historyValue = document.getElementById("history-value");

iterarionInput.value = historyLength;
historySlider.max = historyLength;

const columnsUpButton = document.getElementById("columns-up-button");
const columnsDownButton = document.getElementById("columns-down-button");
const rowsUpButton = document.getElementById("rows-up-button");
const rowsDownButton = document.getElementById("rows-down-button");
updateSidebarValues();

columnsUpButton.addEventListener("click", updateMatrixDimensions);
columnsDownButton.addEventListener("click", updateMatrixDimensions);
rowsUpButton.addEventListener("click", updateMatrixDimensions);
rowsDownButton.addEventListener("click", updateMatrixDimensions);

getMatrixButton.onclick = getMatrix;
postMatrixButton.onclick = postMatrix; 
setIterationsButton.onclick = updateHistorySlide;

function updateHistorySlide(){
    historySlider.max = iterarionInput.value;

    historyLength = iterarionInput.value;
}

historySlider.oninput = function() {    
    console.log(this.value)
    if(history[this.value]){
        generateMatrix(JSON.parse(history[this.value].currentMatrix))
    }
    historyValue.innerHTML = this.value;
}

function updateMatrixDimensions (e) {
    const [ dimension, sign ] = e.path[0].id.split('-');
    if(dimension === "columns"){
        if(sign === "up"){
            columns ++;
        } else {
            columns --;
        }
    } else {
        if(sign === "up"){
            rows ++;
        } else {
            rows --;
        }
    }
  updateSidebarValues();
  matrix = updateMatrixDisplay(updateMatrixValues(matrix));
}

function updateMatrixValues ( matrix ) {
  const newMatrix = new Array(rows)
  for(let i = 0; i < rows; i++){
      const c = new Array(columns)
        newMatrix[i] = c
        for(let j = 0; j < columns; j++){
          if(matrix[i]){
            if(matrix[i][j] === 'o'){
              newMatrix[i][j] = 'o'
            } else {
              newMatrix[i][j] = '-'
            } 
          } else {
            newMatrix[i][j] = '-'
          }
        }
    }
    return newMatrix;
}

function updateSidebarValues (){
  document.getElementById("columns-display").innerHTML = columns
  document.getElementById("rows-display").innerHTML = rows
}

// const importMatrix = ( matrix ) => {
//     columns = matrix[0].length
//     rows = matrix.length
// }