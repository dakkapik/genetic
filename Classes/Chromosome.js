const { validMidPointCircle } = require("../methods/midPointCircle");
const { manhattamDistance } = require("../methods/heuristic")
const AStar = require("../pathing/AStar")
const SQRT2 = Math.sqrt(2)

class Chromosome {
    constructor(num, matrix) {
        this.length
        this.primeMatrix = matrix
        this.cleanedMatrix = matrix;
        this.startPoint = this.randomStart(matrix[0].length, matrix.length)
        const circle = validMidPointCircle(this.startPoint, num, this.primeMatrix)
        this.endPoint = this.randomGoal(circle)
        this.genes = AStar(matrix, this.startPoint, this.endPoint, manhattamDistance);
        //problematic ^
        this.distance = 0;
        this.displacement = 0;
        this.cleaned = 0;
        //fail scenario, what do?
        this.fitness = 0
        this.inmortal = false

        this.distance = this.getDistance(matrix)
        this.displacement = this.getDisplacement()
    }

    calcFitness( worstScore ){
        let score = ( this.cleaned + this.displacement + this.distance ) / worstScore

        if(this.cleaned === 0) return this.fitness = 0.00001
     
        if(this.distance >= worstScore) return this.fitness = 0.00001

        this.fitness = score
        // this.fitness = Math.pow(this.fitness , 2) + 0.0001
    }

    randomStart (maxDomain, maxRange) {
        //make no start on obstacle
        const x = Math.floor(Math.random() * maxDomain)
        const y = Math.floor(Math.random() * maxRange)
        return {x,y}
    }

    randomGoal (circleArray) {
        return circleArray[Math.floor(Math.random() * circleArray.length)]
    }

    markMatrix( matrix ){
        this.genes.forEach(gene => {
            if(matrix[gene.y][gene.x] === '-'){
                matrix[gene.y][gene.x] = "x"
            }
        })
        return matrix
    }

    getDistance(matrix){
        let distance = 0; 
        this.genes.forEach(gene => {
            if(matrix[gene.y][gene.x] === "o") {
                return distance = (matrix.length * matrix[0].length);
            }
            if(gene.cameFrom){
                if(
                    gene.x === gene.cameFrom.x + 1 && gene.y === gene.cameFrom.y + 1 ||
                    gene.x === gene.cameFrom.x + 1 && gene.y === gene.cameFrom.y - 1 ||
                    gene.x === gene.cameFrom.x - 1 && gene.y === gene.cameFrom.y + 1 ||
                    gene.x === gene.cameFrom.x - 1 && gene.y === gene.cameFrom.y - 1 
                ){
                    distance += SQRT2;
                } else {
                    distance ++;
                }
            }
        })
        return distance
    }

    cleanCells(matrix){
        matrix = JSON.parse(matrix)
        let cleanedCells = 0;
        this.genes.forEach(gene => {
            if(matrix[gene.y][gene.x] === '-'){
                matrix[gene.y][gene.x] = "x"
                cleanedCells++
            } 

        });
        return {cleanedCells, matrix}
    }

    getDisplacement(){
        return this.genes[0].x - this.genes[this.genes.length - 1].x
    }

    crossover (partner) {
        // parent mates with new child? lol
        let child = new Chromosome(this.length, this.primeMatrix);
        
        // were to splice
        let midpoint = Math.floor(Math.random() * this.genes.length);

        for(let i = 0; i < this.genes.length; i++){
            if(i > midpoint) child.genes[i] = this.genes[i];
            else child.genes[i] = partner.genes[i];
        }
        return child;
    }

    mutate(mutationRate) {
        const columns = this.primeMatrix[0].length
        for(let i = 0; i < this.genes.length - 1; i++){
            if(this.genes[i]){
                if(Math.random() < mutationRate) {
                    if(Math.random() > 0.5){
                        let mutant = this.genes[i].gene
                        mutant ++
                        this.genes[i].decode(columns, mutant)
                        //decode and encode again
                    } else {
                        let mutant = this.genes[i].gene
                        mutant--
                        this.genes[i].decode(columns, mutant)
                        //decode and encode again
                    }
                }
            }
        }
    }
}

module.exports.Chromosome = Chromosome
