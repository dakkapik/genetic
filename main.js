const Astar = require("./methods/AStar")
const { midPointCircle, validMidPointCircle } = require("./methods/midPointCircle")
const { manhattamDistance, euclidianDistance } = require("./methods/heuristic")
const { createWriteStream, writeFile } = require("fs")

const matrix = require("./testArray/hardArray.json")
const SENSOR_RANGE = 5;
const STARTING_POSITION = {x: 0, y: 0}
// const END_POSITION = {}
// add end position?
const PATH_NOT_FOUND = ["NO_OVERLAP", "OVERLAP"]
const dirtyCells = new Set()

for(let i = 0; i < matrix.length; i ++){
    for(let j = 0; j < matrix[0].length; j++){
        if(matrix[i][j] !== 'o') dirtyCells.add((matrix.length * i+ j))
    }
}

const main = async _ => {
    try {
        let currentPosition = STARTING_POSITION
        const path = []
        while(dirtyCells.size > 0){
            //increase sensor range if this fails
            let scanAttempts = 0;
            let examineInnerRange = true;
            let scanedValues;
            //if no scaned values, gotta change this
            do {
                if(examineInnerRange){
                    scanedValues = validMidPointCircle(matrix, midPointCircle(currentPosition, SENSOR_RANGE - scanAttempts))
                    if(scanAttempts === SENSOR_RANGE - 1) examineInnerRange = false
                } else {
                    scanedValues = validMidPointCircle(matrix, midPointCircle(currentPosition, scanAttempts + 2))
                }
                scanAttempts ++;
            } while (scanedValues.length === 0)

            const randomSelector = Math.round(Math.random() * (scanedValues.length - 1))
            const randomHeading = scanedValues[randomSelector]

            console.log("ITERARION ", path.length , ": ",randomHeading)
            console.log("remaining dirty cells: ",dirtyCells.size)
            if(dirtyCells.size < 5){
                console.log(dirtyCells)
            }
            console.log("============================================")
            let miniPath = await Astar(matrix, currentPosition, randomHeading, manhattamDistance)
            
            if(miniPath === PATH_NOT_FOUND[0]){
                miniPath = await Astar(matrix, currentPosition, randomHeading, manhattamDistance, true)
            }
            if(miniPath === PATH_NOT_FOUND[1]){
                throw codify(new Error ("path not found while allowing overlap"),
                PATH_NOT_FOUND[1]) 
            }

            miniPath.forEach(point => {
                cellNumber = (matrix.length * point.y) + point.x;
                dirtyCells.delete(cellNumber);
                
                matrix[point.y][point.x] = 'x'
            });

            path.push(miniPath);
            currentPosition = randomHeading;
        }

        writeFile("./public/path.json", JSON.stringify(path), (err) => {
            if(err) return console.error("ERROR: ",err)
            else console.log("wrote path successfully")
        })

    } catch (err) {
        console.error(err)
        /*
        on pathfinder fail, 
        switch to allow overlap?
        switch to different heading?    
        */
    }
    
}
main()

function codify (err, code) {
    err.code = code
    return err
}