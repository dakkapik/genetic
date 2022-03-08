const { readdirSync, readFileSync } = require("fs")
const path = require("path")

function fetchLastMatrix(){
    const MATRIX_STORAGE_DIR = './public/matrixStorage';
    const matrixAmount = readdirSync(MATRIX_STORAGE_DIR).length
    return JSON.parse(readFileSync(path.join(MATRIX_STORAGE_DIR, `matrix_${matrixAmount}.json`)))
}

module.exports.fetchLastMatrix = fetchLastMatrix;