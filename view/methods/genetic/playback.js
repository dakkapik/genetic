resetButton.addEventListener("click", resetPlayback)
rewindButton.addEventListener("click", rewindPlayback)
forwardButton.addEventListener("click", forwardPlayback)
playbackButton.addEventListener("click", ()=> {
    if(playing){
        playing = false
        stopPlayback()
    } else {
        playing = true
        if(history != 0){
            startPlayback()
        } else {
            console.log("FETCHING DATA...")
            getCurrentGeneticData()
            .then(({ generation: g, history: h }) => {
                meta = g;
                h.forEach(stage => {
                    history.push(JSON.parse(stage))
                });
                startPlayback()
            })
            .catch(err => console.error("FETCH GENETIC DATA ERROR: ", err))
        } 
        
    }
    playbackButton.innerHTML = ( playing ? "STOP" : "PLAY" )
})

function startPlayback() {
    console.log("STARTING PLAYBACK...")
    playback = setInterval(() => {
        updateMatrixDisplay(history[currentState])

        if(currentState < history.length - 1){
            currentState ++
            generationDisplay.innerHTML = currentState
        } else {
            console.log("PLAYBACK ENDED...")
            clearInterval(playback);
        }
    }, playbackSpeed)
}

function stopPlayback() {
    console.log("STOPING PLAYBACK...")
    clearInterval(playback)
}

function resetPlayback () {
    if(history != 0){
        console.log("RESTARTING PLAYBACK...")
        currentState = 0;
        generationDisplay.innerHTML = currentState
        updateMatrixDisplay(matrix)
    }
}

function rewindPlayback () {
    if(history != 0 && currentState - 1 > -1){
        currentState --
        generationDisplay.innerHTML = currentState
        updateMatrixDisplay(history[currentState])
    }
}

function forwardPlayback () {
    if(history != 0 && currentState + 1 < history.length){
        currentState ++
        generationDisplay.innerHTML = currentState
        updateMatrixDisplay(history[currentState])
    }
}
