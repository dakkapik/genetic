
document.getElementById("run-astar-visual-button")
// .addEventListener("click", () => visualAStar(matrix, {x:0,y:0}, {x: matrix[0].length - 1, y: matrix.length - 1}, euclidianDistance))
.addEventListener("click", () => visualAStar(matrix, {x:0,y:0}, {x: matrix[0].length - 1, y: matrix.length - 1}, manhattamDistance)
.then(result => console.log(result))
.catch(err => console.error(err)))

function visualAStar(matrix, start, goal, h){
    return new Promise ((resolve, reject) => {
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
    
        const interval = setInterval(visualAstar, 10)
    
        function visualAstar (){
            const current = openSet.getMin();
            if(!current){
                clearInterval(interval)
                // console.log("NO ROUTE FOUND")
                reject("path not found")
            }
            
            if(current.x === goal.x && current.y === goal.y){
                //promise based return
                // console.log("done map:",map)
                clearInterval(interval)
                const path = buildPath(current)
                resolve(path)
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
    
        function buildPath( current ){

            const path = [current];

            while (current.cameFrom){
                current = map[current.cameFrom.y][current.cameFrom.x]
                path.push(current)
                updateMatrixByPoint(current, 'x')
            }
            
            return path
        }
    
        function getNeighbors({x, y}){
            // maybe make obstacles infinite distance?
            const neighbors = [];
            // obstacle or clean?
            if(x - 1 > -1){
                if( !map[y][x - 1].obstacle) {
                    neighbors.push(map[y][x - 1])
                    // updateMatrixByPoint({x: x - 1, y}, 'n')
                }
            } 
            if(x + 1 < columns){
                if(!map[y][x + 1].obstacle){
                    neighbors.push(map[y][x + 1])
                    // updateMatrixByPoint({x: x + 1, y}, 'n')
                } 
            }
            if(y - 1 > -1){
                if(!map[y - 1][x].obstacle) {
                    neighbors.push(map[y - 1][x])
                    // updateMatrixByPoint({x, y: y - 1}, 'n')
                }
            }
            if(y + 1 < rows){
                if(!map[y + 1][x].obstacle) {
                    neighbors.push(map[y + 1][x])
                    // updateMatrixByPoint({x, y: + 1}, 'n')
                }
            }
            // if(x + 1 < rows && y - 1 > 0){
            //     if(!map[y - 1][x + 1].obstacle) neighbors.push(map[y - 1][x + 1])
            // }
            // if(x - 1 > 0 && y - 1 > 0){
            //     if(!map[y - 1][x - 1].obstacle) neighbors.push(map[y - 1][x - 1])
            // }
            // if(x - 1 > 0 && y + 1 < columns){
            //     if(!map[y + 1][x - 1].obstacle) neighbors.push(map[y + 1][x - 1])
            // }
            // if(x + 1 < rows && y + 1 < columns){
            //     if(!map[y + 1][x + 1].obstacle) neighbors.push(map[y + 1][x + 1])
            // }
            return neighbors;
        }
    })

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