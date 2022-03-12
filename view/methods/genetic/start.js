



function startPlayback() {
    let historyIndex = 0;
    playback = setInterval(() => {
        







        if(historyIndex < history.length - 1){
            historyIndex ++
        } else {
            clearInterval(playback);
            historyIndex = 0;
        }
    }, INTERVAL)
}

