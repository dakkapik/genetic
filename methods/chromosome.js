const grid = require("../testArray/cleanArray.json")
console.log(randomByRadius(grid, {x:10,y:10}, 4))

function randomByRadius(matrix, position, radius){
    const height = matrix.length - 1;
    const width = matrix[0].length - 1;
    const circle =[];
    for(let x = position.x - radius; x < position.x + radius; x ++){
        for (let y = position.y - radius; y < position.y + radius; y++){
            if(y > -1 && y < height && x > -1 && x < width){
                if(x*x + y*y <= radius*radius){
                    if(matrix[y][x] !== 'x' &&matrix[y][x] !== 'o'){
                        circle.push({x,y})
                    }

                }
            }
        }
    }

    return circle

}