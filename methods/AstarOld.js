module.exports = function generateDNA (matrix, STARTING_POSITION) {
    const Astar = require("../pathing/AStar")
    const { validMidPointCircle } = require("./midPointCircle")
    const { existsSync, writeFile, readdirSync} = require("fs")
    // ALL PATHS NEED TO BE BETTER
    const writeFormated = require("../utils/writeFormated");
    const codify = require("./codify")

    const MATRIX_STORAGE_DIR = './public/matrixStorage';
    const MATRIX_NUMBER = readdirSync(MATRIX_STORAGE_DIR).length
    const MATRIX_NAME = `matrix_${MATRIX_NUMBER}`
    const PATH_STORAGE_DIR = `./public/path/matrix_${MATRIX_NUMBER}`;
    const DNA_CHUNK_SIZE = 5;

    return new Promise (async (resolve, reject) => {
    try {
        const h = require("./heuristic").manhattamDistance
        const SENSOR_RANGE = 5;
        // const END_POSITION = {}
        // add end position?
        const PATH_NOT_FOUND = ["NO_OVERLAP", "OVERLAP"]

        let greatestDimension;

        if(matrix.length > matrix[0].length){
            greatestDimension = matrix.length
        } else {
            greatestDimension = matrix[0].length
        } 

        const dirtyCells = new Set()
        const inaccessible = [];

        for(let i = 0; i < matrix.length; i ++){
            for(let j = 0; j < matrix[0].length; j++){
                if(matrix[i][j] !== 'o') dirtyCells.add((matrix.length * i + j))
            }
        }
        let currentPosition = STARTING_POSITION
        let path = []
        
        while(dirtyCells.size > 0){
            //increase sensor range if this fails
            let examineInnerRange = true;
            let scanedValues;
            let scanAttempts = 0;

            //if no scaned values, gotta change this
            do {
                if(examineInnerRange){
                    scanedValues = validMidPointCircle(currentPosition, SENSOR_RANGE - scanAttempts, matrix)
                    if(scanAttempts === SENSOR_RANGE) examineInnerRange = false
                } else {
                    scanedValues = validMidPointCircle(currentPosition, scanAttempts, matrix)
                    //add <scanAttempts - 1> for more frecuent error
                }
                scanAttempts ++;
            } while (scanedValues.length === 0 && scanAttempts < greatestDimension)
            
            //why does mid point circle fail??
            //fails with a small set of numbers
            // can't find them? //declared as something else?

            let randomHeading;

            if(scanedValues.length === 0) {
                // if midCircle failed to find a point, just use a random point
                console.log("SCAN CIRCLE FAILED: USING RANDOM ANY VALUE")
                let randomStop = Math.round((dirtyCells.size - 1) * Math.random())

                console.log("RANDOM STOP: ", randomStop)
                let index = 0
                for(let cell of dirtyCells.values()){
                    if(index === randomStop) {
                        const x = cell % matrix[0].length
                        const y = (cell - x) / matrix[0].length
                        randomHeading = {x, y}
                        console.log("cell: ", cell,"\nindex: ", index)
                    }
                    index++;
                }
            } else {
                randomHeading = scanedValues[Math.round(Math.random() * (scanedValues.length - 1))]
            }
            // add something to check scaned values? 

            

            console.log("ITERATION ", path.length , " HEADING: ",randomHeading)
            console.log("remaining dirty cells: ",dirtyCells.size)
            if(dirtyCells.size < 5){
                console.log(dirtyCells)
            }
            console.log("============================================")

            let miniPath = await Astar(matrix, currentPosition, randomHeading, h)

            if(miniPath === PATH_NOT_FOUND[0]) miniPath = await Astar(matrix, currentPosition, randomHeading, h, true)

            if (miniPath === PATH_NOT_FOUND[1]){
                matrix[randomHeading.y][randomHeading.x] = 'k';
                cellNumber = (matrix.length * randomHeading.y) + randomHeading.x;
                dirtyCells.delete(cellNumber);
                inaccessible.push(cellNumber);
                // SOMETHING TO HANDLE NOT INACCESSIBLE

            } else {
                // USE CHUNK ARRAY TO GET DESIRED MINIPATH LENGTH, or something else probably
                miniPath = miniPath.reverse();
                miniPath.forEach(point => {
                    cellNumber = (matrix.length * point.y) + point.x;
                    dirtyCells.delete(cellNumber);
                    matrix[point.y][point.x] = 'x';
                    // path.push(point)
                });
                currentPosition = randomHeading;
            }

            path.push(miniPath)
        }

        // path = chunkArray(path, DNA_CHUNK_SIZE)

        const solutionFileName = await writeFormated.path(path, MATRIX_NAME)

        if(!existsSync(PATH_STORAGE_DIR + "/matrixStorage")){
            console.log(await writeFormated.matrix(matrix, PATH_STORAGE_DIR))
            writeFile(PATH_STORAGE_DIR+ '/matrixStorage/inaccessible.json', JSON.stringify(inaccessible), (err) => {if(err) throw codify(err), "WRITE_STREAM_ERROR"})
        }

        resolve(solutionFileName)

    } catch (err) {
        reject(err)
        // console.error("COUGHT ERROR: ",err)
    }
})    
}

/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} Array to split
 * @param chunkSize {Integer} Size of every group
 */
 function chunkArray(myArray, chunk_size){
    var results = [];
    
    while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
    }
    
    return results;
}
