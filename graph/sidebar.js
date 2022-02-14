// const getMatrixButton = document.getElementById("get-matrix-button");
let history = [];
let historyLength = 40;
const postMatrixButton = document.getElementById("post-matrix-button");
const setIterationsButton = document.getElementById("set-iteration-button");
const iterarionInput = document.getElementById("iteration-select");
const historySlider = document.getElementById("history-slider");
const historyValue = document.getElementById("history-value");

iterarionInput.value = historyLength;
historySlider.max = historyLength;

const widthUpButton = document.getElementById("width-up-button");
const widthDownButton = document.getElementById("width-down-button");
const heightUpButton = document.getElementById("heigth-up-button");
const heightDownButton = document.getElementById("heigth-down-button");

widthUpButton.addEventListener("click", updateMatrixDimensions);
widthDownButton.addEventListener("click", updateMatrixDimensions);
heightUpButton.addEventListener("click", updateMatrixDimensions);
heightDownButton.addEventListener("click", updateMatrixDimensions);

postMatrixButton.onclick = postMatrix; 
setIterationsButton.onclick = updateHistorySlide;

function postMatrix() {
    
    const port = "3000"
    const host = "localhost"
    const requestString = "http://" + host + ':' + port + '/' + historyLength
    const stringifiedArray = JSON.stringify(matrix)

    fetch(requestString , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: stringifiedArray,
    })
    .then(response => response.json())
    .then(data => {
        console.log("history request: ",data)
        history = data;
        console.log(history)
        generateMatrix(JSON.parse(history[history.length - 1].currentMatrix))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

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