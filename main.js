const Astar = require("./methods/AStar")
const { midPointCircle, validMidPointCircle } = require("./methods/midPointCircle")
const { manhattamDistance } = require("./methods/heuristic")
const fs = require("fs")

const matrix = require("./testArray/cleanArray.json")
const SENSOR_RANGE = 5;
const STARTING_POSITION = {x: 0, y: 0}
const ITERATIONS = 5


const loop = async _ => {
    try {
        let currentPosition = STARTING_POSITION
        const path = []
        while(path.length < ITERATIONS){
            const scanedValues = validMidPointCircle(matrix, midPointCircle(currentPosition, SENSOR_RANGE))
            const randomSelector = Math.round(Math.random() * scanedValues.length)
            const randomHeading = scanedValues[randomSelector]
            
            const miniPath = await Astar(matrix, currentPosition, randomHeading, manhattamDistance)
            miniPath.forEach(point => {
                matrix[point.y][point.x] = 'x'
            });

            path.push(miniPath);
            currentPosition = randomHeading;

            if(path.length == ITERATIONS) {
                fs.writeFile("./public/path.json", JSON.stringify(path), (err) => {
                    if(err) console.error("ERROR: ",err)
                    else {
                        console.log("path written succesfully")
                    }
                })
            }
        }

        
    } catch (err) {
        console.error(err)
        /*
        on pathfinder fail, 
        switch to allow overlap?
        switch to different heading?    
        */
    }
    
}
loop()