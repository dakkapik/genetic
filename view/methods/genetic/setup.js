const HOST = "http://localhost:3000/";

let playback;
let playbackSpeed;
let matrixStorage;
let meta;
let history = [];
let currentState = 0;
let playing = false;

const matrixSelect = document.getElementById("matrix-select")
const postButton = document.getElementById("post-button")
const playbackButton = document.getElementById("playback-button")
const resetButton = document.getElementById("reset-button")
const rewindButton = document.getElementById("rewind-button")
const forwardButton = document.getElementById("forward-button")
const playbackSpeedSelect = document.getElementById("playback-speed-select")
const generationDisplay = document.getElementById("generation-counter")

playbackButton.innerHTML = ( playing ? "STOP" : "PLAY" )

playbackSpeed = playbackSpeedSelect.value

generationDisplay.innerHTML = currentState;

matrixSelect.addEventListener("change", () => {
    updateMatrixDisplay(matrixStorage[matrixSelect.value].body)
    matrix = matrixStorage[matrixSelect.value].body
})

playbackSpeedSelect.addEventListener("change", () => {
    playbackSpeed = playbackSpeedSelect.value
    startPlayback()
})