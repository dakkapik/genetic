const matrix = require("./fetch/matrix").fetchLastMatrix()
const { validMidPointCircle } = require("./methods/midPointCircle")

const positions = validMidPointCircle({x: 0, y: 0}, 5, matrix)

console.log(positions)