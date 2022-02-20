// module.exports = function(matrix){
const matrix = require("../testArray/obstacleArray.json")
const startPoint = {x: 0, y: 0, steps: 0, f: 0}
const endPoint = {x: matrix[0].length - 1,y: matrix.length - 1}
const path = [];

const openSet = new Set()
openSet.add(startPoint)
const closedSet = new Set()
// const test = openSet.values(startPoint)
// console.log(test)

//// iterate through close and open set to display current search
/*
openSet.forEach(point=>{
    //display opened points
})

closeSet.forEach(point=>{
    //display closed points
})
*/

while(openSet.size > 0){
    let lowestF;

    openSet.forEach(point => {
        if(lowestF){
            if(point.f < lowestF.f){
                lowestF = point;
            }
        } else {
            lowestF = point;
        }
    })

    let current = lowestF;

    if(current.x === endPoint.x && current.y === endPoint.y){
        console.log("END");
        let temp = current
        path.push(temp)
        while(temp.previous){
            path.push(temp.previous)
            temp = temp.previous
        }
        console.log(JSON.stringify(drawPath(path)))
        break;
    }

    openSet.delete(current);

    getNeighbors(current).forEach(point=>{

        if(!closedSet.has(point)){
            const tempSteps = current.steps + 1
            if(openSet.has(point)){
                oldScore = openSet.values(point)
                if(tempSteps < oldScore.steps){
                    const betterPathPoint = point
                    betterPathPoint.steps = tempSteps
                    betterPathPoint.previous = current

                    openSet.add(betterPathPoint)
                    openSet.delete(point)
                }
            } else {
                point.steps = tempSteps
                point.f = getHeuristic(point, endPoint)
                point.previous = current
                openSet.add(point)
            }

        }
    })
    closedSet.add(current);
}


function getNeighbors({x, y}){
    const neighbors = new Set();
    const isValidNeighbor = (x, y) =>{
        return (
            x >= 0 &&
            x < matrix[0].length &&
            y >= 0 &&
            y < matrix.length &&
            matrix[y][x] !== 'o'
        )
    }
    if(isValidNeighbor(x - 1, y)){
        neighbors.add({x: x - 1, y})
    }
    if(isValidNeighbor(x + 1, y)){
        neighbors.add({x: x + 1, y})
    }
    if(isValidNeighbor(x, y - 1)){
        neighbors.add({x, y: y - 1})
    }
    if(isValidNeighbor(x, y + 1)){
        neighbors.add({x, y: y + 1})
    }
    return neighbors;
}


function getHeuristic (cell, end){
    //euclidian distance
    // return Math.hypot(abs( end.x - cell.x ), abs( end.y - cell.y ))
//=======================================================================
    // manhattam distance (no diagonal steps)
    return Math.abs(cell.x - end.x) + Math.abs(cell.y - end.y)
}

function drawPath (path){
    path.forEach(point => {
        matrix[point.y][point.x] = 'x'
    })
    return matrix  
}

// }