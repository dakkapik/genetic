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
            .then((currentPopulation) => {
                meta = currentPopulation;
                currentPopulation.chromosomeHistory.forEach(element => {
                    element = JSON.parse(element)
                    // FIX THIS MONSTROSITY
                    history.push({matrix: element.cleanedMatrix, chromosome: element})
                })
                startPlayback()
            })
            .catch(err => console.error("FETCH GENETIC DATA ERROR: ", err))
        } 
        
    }
    playbackButton.innerHTML = ( playing ? "STOP" : "PLAY" )
})

function startPlayback() {
    console.log("STARTING PLAYBACK...")
    console.log(history)
    playback = setInterval(() => {
        updateMatrixDisplay(history[currentState].matrix)
        displayCurrentChromosome(history[currentState].chromosome.genes)
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
        updateMatrixDisplay(history[currentState].matrix)
        displayCurrentChromosome(history[currentState].chromosome.genes)
    }
}

function forwardPlayback () {
    if(history != 0 && currentState + 1 < history.length){
        currentState ++
        generationDisplay.innerHTML = currentState
        updateMatrixDisplay(history[currentState].matrix)
        displayCurrentChromosome(history[currentState].chromosome.genes)
    }
}
