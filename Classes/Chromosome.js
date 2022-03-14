const { validMidPointCircle } = require("../methods/midPointCircle");
const { manhattamDistance } = require("../methods/heuristic")
const AStar = require("../pathing/AStar")
const SQRT2 = Math.sqrt(2)

module.exports = class Chromosome {
    constructor( matrixPrimus, matrixGene, matrixPoints ) {
        this.sensorRadius = 5;
        this.genes = [];
        //problematic ^
        this.distance = 0;
        this.displacement = 0;
        this.free = 0;
        //fail scenario, what do?
        this.fitness = 0;
        this.inmortal = false;

        this.createGenes( matrixGene, matrixPoints )

        // this.distance = this.getDistance( matrix )
        // this.displacement = this.getDisplacement()
    }

    calcFitness( worstScore ){
        let score = ( this.cleaned + this.displacement + this.distance ) / worstScore

        if(this.cleaned === 0) return this.fitness = 0.00001
     
        if(this.distance >= worstScore) return this.fitness = 0.00001

        this.fitness = score
        // this.fitness = Math.pow(this.fitness , 2) + 0.0001
    }

    createGenes ( matrixGene, matrixPoints ) {
        let path = false
        let safe = 0
        while(!path){
            const maxDomain = matrixPoints[0].length 
            const maxRange = matrixPoints.length
            const start = {x: Math.floor(Math.random() * maxDomain), y: Math.floor(Math.random() * maxRange)}
            while(matrixPoints[start.y][start.x] === 'o') {
                start.x = Math.floor(Math.random() * maxDomain) 
                start.y = Math.floor(Math.random() * maxRange)
            }
            //ERROR HERE: 
            const circle = validMidPointCircle(start, this.sensorRadius, matrixPoints)

            const end = circle[Math.floor(Math.random() * circle.length)]

            path = AStar(matrixPoints, start, end, manhattamDistance)
            // if(!path) console.log("PATH NOT FOUND:", path)
            if(safe > 10) break
            safe++
        }

        path.forEach(( point, index ) => {
            const gene = matrixGene[point.y][point.x] 
            this.genes[index] = gene
        });
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
