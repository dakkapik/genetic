const MinHeap = require("../Classes/MinHeap");

module.exports = function ( matrix, start, goal, h ){  

    // const PATH_NOT_FOUND = ["NO_OVERLAP", "OVERLAP"]
    const rows = matrix.length;
    const columns = matrix[0].length;
    const sqrt2 = Math.sqrt(2);

    const openSet = new MinHeap();

    matrix[start.y][start.x].g = 0
    matrix[start.y][start.x].f = h( start, goal )

    openSet.insert(matrix[start.y][start.x])

    while(openSet.getMin()){
        const current = openSet.getMin();
        if(current.x === goal.x && current.y === goal.y){
            const path = buildPath( current )
            return path
        }

        openSet.removeSmallest();

        const neighbors = getNeighbors(current) 

        for(let i = 0; i < neighbors.length; i++){
            const currentNeighbor = neighbors[i]
            const temptingGScore = current.g + distance(current, currentNeighbor);

            if(temptingGScore < currentNeighbor.g){
                matrix[currentNeighbor.y][currentNeighbor.x].cameFrom = {x: current.x, y: current.y};
                matrix[currentNeighbor.y][currentNeighbor.x].g = temptingGScore;
                matrix[currentNeighbor.y][currentNeighbor.x].f = temptingGScore + h(currentNeighbor, goal)
                if(!openSet.has(currentNeighbor)){
                    openSet.insert(currentNeighbor)
                }

            }
            
        }
    }

    // console.log("MATRIX: ", matrix)
    // console.log("START: ", start)
    // console.log("GOAL: ", goal)

    return [{x:0,y:0}]
    //resolve string if path not found
    // if(!overlapAllowed){
    //     //somthing about this
    //     console.log("ASTAR ERROR: ",PATH_NOT_FOUND[0])
    //     return [{x:0,y:0}]
    // } else {
    //     console.log("ASTAR ERROR: ", PATH_NOT_FOUND[1])
    //     //reject here?
    //     return [{x:0,y:0}]
    // }   

    function distance (current, neighbor){
        if(
            current.x === neighbor.x + 1 && current.y === neighbor.y + 1 ||
            current.x === neighbor.x + 1 && current.y === neighbor.y - 1 ||
            current.x === neighbor.x - 1 && current.y === neighbor.y + 1 ||
            current.x === neighbor.x - 1 && current.y === neighbor.y - 1 
        ){
            return sqrt2;
        } else {
            return 1;
        }
    }

    function buildPath( start ){
        const path = [ start ];
        let point = start;
        if(!point.cameFrom) return path
        do {
            point = matrix[point.cameFrom.y][point.cameFrom.x]
            path.push(point)
        } while (point.cameFrom)

        return path
    }

    function getNeighbors({x, y}){
        // maybe make obstacles infinite distance?
        const neighbors = [];
        // obstacle or clean?
        if(x - 1 > - 1){
            if(!matrix[y][x - 1].obstacle) neighbors.push(matrix[y][x - 1])
        } 
        if(x + 1 < columns){
            if(!matrix[y][x + 1].obstacle) neighbors.push(matrix[y][x + 1])
        }
        if(y - 1 > - 1){
            if(!matrix[y - 1][x].obstacle) neighbors.push(matrix[y - 1][x])
        }
        if(y + 1 < rows){
            if(!matrix[y + 1][x].obstacle) neighbors.push(matrix[y + 1][x])
        }
        if(h.name === "euclidianDistance"){
            if(x + 1 < columns - 1 && y - 1 > - 1){
                if(!matrix[y - 1][x + 1].obstacle) neighbors.push(matrix[y - 1][x + 1])
            }
            if(x - 1 > - 1 && y - 1 > - 1){
                if(!matrix[y - 1][x - 1].obstacle) neighbors.push(matrix[y - 1][x - 1])
            }
            if(x - 1 > - 1 && y + 1 < rows - 1){
                if(!matrix[y + 1][x - 1].obstacle) neighbors.push(matrix[y + 1][x - 1])
            }
            if(x + 1 < columns - 1 && y + 1 < rows - 1){
                if(!matrix[y + 1][x + 1].obstacle) neighbors.push(matrix[y + 1][x + 1])
            }
        }
        return neighbors;
    }
    // })
}
