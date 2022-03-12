const HOST = "http://localhost:3000/";
const INTERVAL = 20;

let playback;
let history;
let currentState = 0;
let matrixStorage;
let playing = false;

const matrixSelect = document.getElementById("matrix-select")
const postButton = document.getElementById("post-button")
const playbackButton = document.getElementById("playback-button")
const resetButton = document.getElementById("reset-button")
const rewindButton = document.getElementById("rewind-button")
const forwardButton = document.getElementById("forward-button")

playbackButton.innerHTML = ( playing ? "STOP" : "PLAY" )

matrixSelect.addEventListener("change", () => {
    updateMatrixDisplay(matrixStorage[matrixSelect.value].body)
    matrix = matrixStorage[matrixSelect.value].body
})
