const DNA = require("../genetic/DNA")
const fitness = require("./globalPath")
const { readdirSync } = require("fs")

const STARTING_POSITION = {x: 0, y: 0};

const MATRIX_STORAGE_DIR = './public/matrixStorage';
const MATRIX_NUMBER = readdirSync(MATRIX_STORAGE_DIR).length
const MATRIX_NAME = `matrix_${MATRIX_NUMBER}`
const MATRIX_FILE = `${MATRIX_NAME}.json`;

const matrix = require(`./public/matrixStorage/${MATRIX_FILE}`)

const exec = async ()=>{
    // const pathDir = await DNA(matrix, STARTING_POSITION)
    const workDir = readdirSync("./public/path/matrix_1")
    const survivalScore = []

    console.log("SOLUTIONS: ",workDir)
    workDir.forEach(solution => {
        if(solution !== "matrixStorage"){
            survivalScore.push(fitness(`../public/path/matrix_1/${solution}`, matrix))
        }
    })
    
    console.log(survivalScore)
}

exec()
