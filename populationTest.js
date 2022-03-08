const DNA = require("./methods/DNA")
const { readdirSync } = require("fs")

const STARTING_POSITION = {x: 0, y: 0};

const MATRIX_STORAGE_DIR = './public/matrixStorage';
const MATRIX_NUMBER = readdirSync(MATRIX_STORAGE_DIR).length
const MATRIX_NAME = `matrix_${MATRIX_NUMBER}`
const MATRIX_FILE = `${MATRIX_NAME}.json`;

const matrix = require(`./public/matrixStorage/${MATRIX_FILE}`)

DNA(matrix, STARTING_POSITION)

// const path = require("./public/path/matrix_1/solution_2.json")

// path.forEach(minipath => {
//     console.log(minipath.length)
// });

// console.log(path[path.length - 1])