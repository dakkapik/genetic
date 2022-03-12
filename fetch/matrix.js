const { MATRIX_STORAGE } = require("../global_paths.json")
const { readdirSync, readFileSync } = require("fs")
const path = require("path")


function fetchLastMatrix(){
    const matrixAmount = readdirSync(MATRIX_STORAGE).length
    return JSON.parse(readFileSync(path.join(MATRIX_STORAGE, `matrix_${matrixAmount}.json`)))
}

function fetchAllMatrix() {
    const allMatrix = readdirSync(MATRIX_STORAGE)
    const data = []
    allMatrix.forEach(matrix => {
        const body = JSON.parse(readFileSync(path.join(MATRIX_STORAGE, matrix)))
        data.push({name: matrix, body})
    })
    return data
}

module.exports.fetchAllMatrix = fetchAllMatrix
module.exports.fetchLastMatrix = fetchLastMatrix;