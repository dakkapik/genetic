const matrix = require("./testArray/cleanArray.json").array

// const numberedMatrix 

const scan = scanByRadius(0, 0, matrix, 1);
console.log(scan)


// function




function scanByRadius(x, y, matrix, radius) {
    const result = {dirty:[], clean:[]}
    for(let i = y - radius; i <= y + radius; i++){
        for(let o = x - radius; o <= + radius; o++){
            if(
                matrix[i] 
                // && (x !== o && y !== i)
                ){
                if(matrix[i][o] === '-') result.dirty.push({x: o, y: i});
                if(matrix[i][o] === 'x') result.clean.push({x: o, y: i});
            }
        }
    }
    return result
}