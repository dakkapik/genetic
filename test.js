const { writeFile } = require("fs")
const Population = require("./Classes/Population")

const MATRIX = require("./public/matrix_storage/matrix.json")
const MUTATION_RATE = 0.2
const POPULATION_LENGTH = 20

const gen = new Population(MUTATION_RATE, POPULATION_LENGTH, MATRIX)
const name = "gen_1.json"

writeFile("./public/gen/" + name, JSON.stringify(gen, null, 2), (err) =>{ if(err) console.error(err) })