module.exports = function (grid, start, goal, h, overlapAllowed = false){  
    return new Promise ((resolve, reject) => {
        
    const PATH_NOT_FOUND = ["NO_OVERLAP", "OVERLAP"]
    const { Point, MinHeap } = require("./AstarClases")

    const rows = grid.length;
    const columns = grid[0].length;

    const openSet = new MinHeap();

    const map = new Array(rows);
    const sqrt2 = Math.sqrt(2);

    for(let i = 0; i < rows; i++){
        map[i] = new Array(columns)
        for(let j = 0; j < columns; j++){
            const point = new Point(j, i)
            // add other letters here
            point.gene = i * rows + j
            if(grid[i][j] === 'o') point.obstacle = true;
            if(!overlapAllowed) if(grid[i][j] === 'x') point.obstacle = true;
            map[i][j] = point;
        }
    }
    map[start.y][start.x].g = 0
    map[start.y][start.x].f = h(start, goal)

    openSet.insert(map[start.y][start.x])

    while(openSet.getMin()){
        const current = openSet.getMin();
        if(current.x === goal.x && current.y === goal.y){
            resolve(buildPath(current, overlapAllowed))
        }

        openSet.removeSmallest();

        const neighbors = getNeighbors(current) 

        for(let i = 0; i < neighbors.length; i++){
            const currentNeighbor = neighbors[i]
            const temptingGScore = current.g + distance(current, currentNeighbor);

            if(temptingGScore < currentNeighbor.g){
                map[currentNeighbor.y][currentNeighbor.x].cameFrom = {x: current.x, y: current.y};
                map[currentNeighbor.y][currentNeighbor.x].g = temptingGScore;
                map[currentNeighbor.y][currentNeighbor.x].f = temptingGScore + h(currentNeighbor, goal)
                if(!openSet.has(currentNeighbor)){
                    openSet.insert(currentNeighbor)
                }

            }
            
        }
    }

    //resolve string if path not found
    if(!overlapAllowed){
        resolve(PATH_NOT_FOUND[0])
    } else {
        //reject here?
        resolve(PATH_NOT_FOUND[1])
    }   

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

    function buildPath( start, overlap ){
        const path = [start];
        let point = start;
        do {
            point = map[point.cameFrom.y][point.cameFrom.x]

            if(overlap) 
            if(
                grid[point.y][point.x] === 'x' && 
                point.x !== start.x && 
                point.y !== start.y
            ) point.overlap = true;


            path.push(point)
        } while (point.cameFrom)

        return path
    }

    function getNeighbors({x, y}){
        // maybe make obstacles infinite distance?
        const neighbors = [];
        // obstacle or clean?
        if(x - 1 > - 1){
            if(!map[y][x - 1].obstacle) neighbors.push(map[y][x - 1])
        } 
        if(x + 1 < columns){
            if(!map[y][x + 1].obstacle) neighbors.push(map[y][x + 1])
        }
        if(y - 1 > - 1){
            if(!map[y - 1][x].obstacle) neighbors.push(map[y - 1][x])
        }
        if(y + 1 < rows){
            if(!map[y + 1][x].obstacle) neighbors.push(map[y + 1][x])
        }
        if(h.name = "euclidianDistance"){
            if(x + 1 < columns - 1 && y - 1 > - 1){
                if(!map[y - 1][x + 1].obstacle) neighbors.push(map[y - 1][x + 1])
            }
            if(x - 1 > - 1 && y - 1 > - 1){
                if(!map[y - 1][x - 1].obstacle) neighbors.push(map[y - 1][x - 1])
            }
            if(x - 1 > - 1 && y + 1 < rows - 1){
                if(!map[y + 1][x - 1].obstacle) neighbors.push(map[y + 1][x - 1])
            }
            if(x + 1 < columns - 1 && y + 1 < rows - 1){
                if(!map[y + 1][x + 1].obstacle) neighbors.push(map[y + 1][x + 1])
            }
        }
        return neighbors;
    }
    })
}
