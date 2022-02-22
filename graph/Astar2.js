let startPoint;
let endPoint;
const path = [];

const openSet = new Set();
const closedSet = new Set();

function setStart(x,y){
    startPoint = new Point(x,y)
}

function setEnd(x,y){
    endPoint = new Point(x,y)
}

class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.g = 0;
        this.h = 0;
        this.f = 0;
        this.previous = undefined;
    }

    getHeuristic(){
        //euclidian distance
        // return Math.hypot( endPoint.x - this.x , endPoint.y - this.y )
    //=======================================================================
        // manhattam distance (no diagonal steps)
        return Math.abs(this.x - endPoint.x) + Math.abs(this.y - endPoint.y)
    }

    getNeighbors(){
        const x = this.x;
        const y = this.y;
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
            neighbors.add(new Point(x - 1, y))
        }
        if(isValidNeighbor(x + 1, y)){
            neighbors.add(new Point(x + 1, y))
        }
        if(isValidNeighbor(x, y - 1)){
            neighbors.add(new Point(x, y - 1))
        }
        if(isValidNeighbor(x, y + 1)){
            neighbors.add(new Point(x, y + 1))
        }
        return neighbors;
    }
}

setStart(0,0)
setEnd(28,28)
// setInterval(run, 100)

// CREATE NEW MATRIX ABSTRACT WITH ALL VALUES ALREADY IN IT

function run(){
    openSet.add(startPoint)
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

        current.getNeighbors().forEach(point=>{
            if(!closedSet.has(point)){
                const tempSteps = current.g + 1
                if(openSet.has(point)){
                    oldScore = openSet.values(point)
                    if(tempSteps < oldScore.g){
                        const betterPathPoint = point
                        betterPathPoint.g = tempSteps
                        betterPathPoint.previous = current

                        openSet.add(betterPathPoint)
                        openSet.delete(point)
                    }
                } else {
                    console.log(point)
                    point.g = tempSteps
                    point.f = point.getHeuristic() + point.steps
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