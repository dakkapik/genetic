const start = {x: 0, y: 0}
const end = {x: matrix[0].length - 1, y: matrix.length - 1}
const path = AStar(matrix, start, end, manhattamDistance)

function AStar(matrix, start, goal, h){
    
    const rows = matrix.length;
    const columns = matrix[0].length;

    const openSet = new MinHeap();
    // const closedSet = new Set();
    const map = new Array(rows);

    for(let i = 0; i < rows; i++){
        map[i] = new Array(columns)
        for(let j = 0; j < columns; j++){
            const point = new Point(j, i)
            // add other letters here
            if(matrix[i][j] === 'o'){
                point.obstacle = true;
            } 
            map[i][j] = point;
        }
    }
    map[start.y][start.x].g = 0
    map[start.y][start.x].f = h(start, goal)

    openSet.insert(map[start.y][start.x])
    updateMatrixByPoint(start, 'u')

    while(openSet.getMin()){
        const current = openSet.getMin();

        if(current.x === goal.x && current.y === goal.y){
            //promise based return
            // console.log("done map:",map)
            return buildPath(current)
        }

        openSet.removeSmallest();

        const neighbors = getNeighbors(current) 

        for(let i = 0; i < neighbors.length; i++){
            const currentNeighbor = neighbors[i]
            const temptingGScore = current.g + 1;

            if(temptingGScore < currentNeighbor.g){
                map[currentNeighbor.y][currentNeighbor.x].cameFrom = {x: current.x, y: current.y};
                map[currentNeighbor.y][currentNeighbor.x].g = temptingGScore;
                map[currentNeighbor.y][currentNeighbor.x].f = temptingGScore + h(currentNeighbor, goal)
                if(!openSet.has(currentNeighbor)){
                    openSet.insert(currentNeighbor)
                    updateMatrixByPoint(current, 'u')
                }

            }
            
        }
        updateMatrixByPoint(current, 'c');
    }
    //async undefined if no result
    return undefined;

    function buildPath( current ){
        const path = [current];
        while (current.cameFrom){
            updateMatrixByPoint(current, 'x')
            current = map[current.cameFrom.y][current.cameFrom.x]
            path.push(current)
        }
        return path
    }

    function getNeighbors({x, y}){
        // maybe make obstacles infinite distance?
        const neighbors = [];
        // obstacle or clean?
        if(x - 1 > 0){
            if( !map[y][x - 1].obstacle) neighbors.push(map[y][x - 1])
        } 
        if(x + 1 < columns){
            if(!map[y][x + 1].obstacle) neighbors.push(map[y][x + 1])
        }
        if(y - 1 > 0){
            if(!map[y - 1][x].obstacle) neighbors.push(map[y - 1][x])
        }
        if(y + 1 < rows){
            if(!map[y + 1][x].obstacle) neighbors.push(map[y + 1][x])
        }
        return neighbors;
    }
}

function updateMatrixByPoint(point, state){
    matrix[point.y][point.x] = state
    updateMatrixDisplay(matrix)
}

function euclidianDistance (current, goal){
    return Math.hypot(Math.abs( current.x - goal.x ), Math.abs( current.y - goal.y ))
}

function manhattamDistance(current, goal){
    return Math.abs(current.x - goal.x) + Math.abs(current.y - goal.y)
}