resetButton.addEventListener("click", resetPlayback)
playbackButton.addEventListener("click", ()=> {
    playing = !playing
    playbackButton.innerHTML = ( playing ? "STOP" : "PLAY" )
    if(playing){
        stopPlayback()
    } else {
        if(history){
            startPlayback()
        } else {
            getCurrentGeneticData()
            .then(result => {
                history = result
                startPlayback()
            })
            .catch(err => console.error("FETCH GENETIC DATA ERROR: ", err))
        } 
    }
    
})

function startPlayback() {
    playback = setInterval(() => {

        updateMatrixDisplay(history[currentState])

        if(currentState < history.length - 1){
            currentState ++
        } else {
            clearInterval(playback);
        }
    }, INTERVAL)
}

function stopPlayback() {
    clearInterval(playback)
}

function resetPlayback () {
    currentState = 0;
    updateMatrixDisplay(history[currentState])
}


