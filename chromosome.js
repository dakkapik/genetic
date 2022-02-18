// const matrix = require("./testArray/cleanArray.json")
const MATRIX = require("./testArray/obstacleArray.json")
const DEFAULT_SCAN_RADIUS = 5;
let currentPosition = {x: 0, y: 0}

MATRIX[currentPosition.y][currentPosition.x] = 'x'

const scan = scanByRadius(currentPosition.x, currentPosition.y, MATRIX, DEFAULT_SCAN_RADIUS);
console.log(scan)


// function




function scanByRadius(centerX, centerY, matrix, radius) {
    // const result = {dirty:[], clean:[]}
    // for(let i = y - radius; i <= y + radius; i++){
    //     for(let o = x - radius; o <= + radius; o++){
    //         if(matrix[i]){
    //             if(matrix[i][o] === '-') result.dirty.push({x: o, y: i});
    //             if(matrix[i][o] === 'x') result.clean.push({x: o, y: i});
    //         }
    //     }
    // }
    // return result

    const result = []

    for(let x = centerX - radius; x < centerX + radius; x++){
        console.log("x: ", x)
        const y = Math.sqrt(Math.pow(radius, 2) - Math.pow(x, 2))
        console.log("y: ", y)
        if(matrix[y]){
            if(matrix[y][x] === '-'){
                // console.log('x: ', x, 'y: ', y)
            }
        }
    }
}