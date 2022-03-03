const Astar = require("./methods/AStar")
const { midPointCircle, validMidPointCircle } = require("./methods/midPointCircle")
const { manhattamDistance, euclidianDistance } = require("./methods/heuristic")
const { createWriteStream, writeFile } = require("fs")

const matrix = require("./public/testArray/matrix_9.json")

const SENSOR_RANGE = 5;
const STARTING_POSITION = {x: 0, y: 0}
// const END_POSITION = {}
// add end position?
const PATH_NOT_FOUND = ["NO_OVERLAP", "OVERLAP"]
const dirtyCells = new Set()
const inaccessible = [];

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
            let examineInnerRange = true;
            let scanedValues;
            let scanAttempts = 0;
            //if no scaned values, gotta change this
            do {
                if(examineInnerRange){
                    scanedValues = validMidPointCircle(matrix, midPointCircle(currentPosition, SENSOR_RANGE - scanAttempts))
                    if(scanAttempts === SENSOR_RANGE - 1) examineInnerRange = false
                } else {
                    scanedValues = validMidPointCircle(matrix, midPointCircle(currentPosition, scanAttempts + 1))
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
            
            if(miniPath === PATH_NOT_FOUND[0]) miniPath = await Astar(matrix, currentPosition, randomHeading, manhattamDistance, true)

            if (miniPath === PATH_NOT_FOUND[1]){
                console.log(PATH_NOT_FOUND[1], currentPosition)
                matrix[randomHeading.y][randomHeading.x] = 'k';
                cellNumber = (matrix.length * randomHeading.y) + randomHeading.x;
                dirtyCells.delete(cellNumber);
                inaccessible.push(cellNumber);
                // SOMETHING TO HANDLE NOT INACCESSIBLE

            } else {

                miniPath.forEach(point => {
                    cellNumber = (matrix.length * point.y) + point.x;
                    dirtyCells.delete(cellNumber);
                    matrix[point.y][point.x] = 'x';
                });
    
                path.push(miniPath);
                currentPosition = randomHeading;
            }

        }

        const stream = createWriteStream("./public/path.json")
        stream.on("error", function (err) {throw codify(err), "WRITE_STREAM_ERROR"})

        stream.write('[\n')
        path.forEach((minipath, index) => {
            if(path.length === index + 1){
                stream.write(JSON.stringify(minipath) + '\n')
            } else {
                stream.write(JSON.stringify(minipath) + ',\n')
            }
        });
        stream.write(']')

        stream.end(()=> console.log('Path written succesfully'))

        writeFile('./public/current_matrix.json', JSON.stringify(matrix), (err)=> {if(err) throw codify(err), "WRITE_STREAM_ERROR"})
        writeFile('./public/inaccessible.json', JSON.stringify(inaccessible), (err) => {if(err) throw codify(err), "WRITE_STREAM_ERROR"})
        
    } catch (err) {
        console.error("COUGHT ERROR: ",err)
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