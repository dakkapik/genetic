const { validMidPointCircle } = require("../methods/midPointCircle");
const { manhattamDistance } = require("../methods/heuristic")
const AStar = require("../pathing/AStar")

class Chromosome {
    constructor(num, matrix) {
        this.startPoint = this.randomStart(matrix[0].length, matrix.length)
        const circle = validMidPointCircle(this.startPoint, num, matrix)
        this.endPoint = this.randomGoal(circle)
        this.genes = AStar(matrix, this.startPoint, this.endPoint, manhattamDistance);
        this.fitness = Infinity;
    }

    randomStart (maxDomain, maxRange) {
        const x = Math.floor(Math.random() * maxDomain)
        const y = Math.floor(Math.random() * maxRange)
        return {x,y}
    }

    randomGoal (circleArray) {
        return circleArray[Math.floor(Math.random() * circleArray.length)]
    }

    markMatrix( matrix ){
        this.genes.forEach(gene => {
            matrix[gene.y][gene.x] = "x"
        })
        return matrix
    }

    calcFitness(){

    }
}

module.exports.Chromosome = Chromosome