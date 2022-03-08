module.exports = function ( solutionDir, matrix ){
    const path = require(solutionDir)

    let overlap = 0;
    let totalDistance = 0;
    let turns = 0;
    let direction = checkDirection(path[0][0], path[0][1])

    const SQRT2 = Math.sqrt(2)

    path.forEach((minipath) => {
        minipath.forEach((move) => {
            if(move.cameFrom){
                totalDistance += distance({x: move.x, y: move.y}, move.cameFrom)
                let newDirection = checkDirection({x: move.x, y: move.y}, move.cameFrom)
                if(newDirection !== direction){
                    direction = newDirection;
                    turns ++;
                }
            }

            if(matrix[move.y][move.x] === "x"){
                overlap ++;
            }else {
                matrix[move.y][move.x] = "x"
            }

        })
    })

    return {overlap, totalDistance, turns, dir: solutionDir}

    function distance (current, neighbor){
        if(
            current.x === neighbor.x + 1 && current.y === neighbor.y + 1 ||
            current.x === neighbor.x + 1 && current.y === neighbor.y - 1 ||
            current.x === neighbor.x - 1 && current.y === neighbor.y + 1 ||
            current.x === neighbor.x - 1 && current.y === neighbor.y - 1 
        ){
            return SQRT2;
        } else {
            return 1
        }
    }

    function checkDirection (current, neighbor) {
        
        const VECTOR = [
            "west",
            "south-west",
            "south",
            "south-east",
            "east",
            "north-east",
            "north",
            "north-west",
        ];

        if(current.x === neighbor.x - 1){
            if(current.y === neighbor.y){
                return VECTOR[0]
            } else if (current.y === neighbor.y + 1){
                return VECTOR[7]
            } else if (current.y === neighbor.y - 1){
                return VECTOR[1]
            }
        }

        if(current.x === neighbor.x + 1){
            if(current.y === neighbor.y){
                return VECTOR[4]
            } else if (current.y === neighbor.y + 1){
                return VECTOR[5]
            } else if (current.y === neighbor.y - 1){
                return VECTOR[3]
            }
        }

        if(current.x === neighbor.x){
            if (current.y === neighbor.y + 1){
                return VECTOR[2]
            } else if (current.y === neighbor.y - 1){
                return VECTOR[6]
            }
        }
    }
}