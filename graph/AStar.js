let startPoint
const endPoint = {x: matrix[0].length - 1,y: matrix.length - 1};
const path = [];

const openSet = new Set();
const closedSet = new Set();


function startOn(x, y){
    startPoint = {x, y, steps: 0, f: 0};
    openSet.add(startPoint);
}

startOn(0,0); 

//// iterate through close and open set to display current search

// const interval = setInterval(run, 20)

// while (openSet.size > 0) run()

function run(){
    let lowestF;
    if(openSet.size > 0){

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
            drawPath(path)
            clearInterval(interval)
        }

        openSet.delete(current);
        closedSet.add(current);
        
        openSet.forEach(point=>{
            matrix[point.y][point.x] = 'u' 
            //display opened points
        })
        
        closedSet.forEach(point=>{
            matrix[point.y][point.x] = 'c' 
            //display closed points
        })

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
                    point.f = getHeuristic(point, endPoint) + point.steps
                    point.previous = current
                    openSet.add(point)
                }

            }
        })

        updateMatrixDisplay(matrix);
    } else {
        console.log("solution could not be found")
    }
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
    // return Math.hypot(Math.abs( end.x - cell.x ), Math.abs( end.y - cell.y ))
//=======================================================================
    // manhattam distance (no diagonal steps)
    return Math.abs(cell.x - end.x) + Math.abs(cell.y - end.y)
}

function drawPath (path){
    path.forEach(point => {
        matrix[point.y][point.x] = 'x';
    })
    updateMatrixDisplay(matrix);
}
