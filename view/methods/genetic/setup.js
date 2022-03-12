const HOST = "http://localhost:3000/";
const INTERVAL = 20;

let playback;
let history;
let currentState = 0;
let matrixStorage;

const matrixSelect = document.getElementById("matrix-select")
const postButton = document.getElementById("post-button")
const startButton = document.getElementById("start-button")
const stopButton = document.getElementById("stop-button")
const resetButton = document.getElementById("reset-button")
const rewindButton = document.getElementById("rewind-button")
const forwardButton = document.getElementById("forward-button")

matrixSelect.addEventListener("change", () => {
    updateMatrixDisplay(matrixStorage[matrixSelect.value].body)
    matrix = matrixStorage[matrixSelect.value].body
})



