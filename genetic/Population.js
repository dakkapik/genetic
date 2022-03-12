const { Chromosome } = require("./Chromosome")

class Population {
    constructor(m, num, matrix) {
        const SENSOR_RANGE = 5

        this.matrix = matrix;
        this.population = [];
        this.generations = 0;
        this.finished;// record target?
        this.mutationRate = m;
        this.perfectScore = 0;
        

        this.best = []

        for(let i = 0; i < num; i ++){
            this.population[i] = new Chromosome(SENSOR_RANGE, matrix)
        }

        this.markMatrix()
        // this.calcFitness();
    }

    markMatrix(){
        this.population.forEach(chromosome => {
            const matrix = chromosome.markMatrix(this.matrix)
            console.log(matrix)
            this.matrix = matrix
        });
    }
}

module.exports.Population = Population;