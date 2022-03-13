const { Chromosome } = require("./Chromosome")

class Population {
    constructor(m, num, matrix) {
        this.sensorRange = 5
        this.cleanedMatrix = JSON.stringify(matrix);
        this.population = [];
        this.chromosomeHistory = []
        this.generations = 0;
        this.finished;// record target?
        this.mutationRate = m;
        this.worstScore = ( matrix.length * matrix[0].length );
        this.perfectScore = 0
        this.bestScore = 0

        for(let i = 0; i < num; i ++){
            this.population[i] = new Chromosome(this.sensorRange, matrix)
        }

        this.clean();
        this.calcFitness();
        this.createHistory();
    }

    clean() {
        this.population.forEach((chromosome, index) => {
            const { cleanedCells, matrix } = chromosome.cleanCells(this.cleanedMatrix)
            this.population[index].cleaned = cleanedCells
            this.cleanedMatrix = JSON.stringify(matrix)
        });
    }

    calcFitness(){
        for(let i = 0; i < this.population.length; i++){
            this.population[i].calcFitness(this.worstScore)
        }
    }
    //wtf is this thing
    createHistory(){
        this.population.forEach((chromosome,index) => {
            this.chromosomeHistory.push(JSON.stringify(chromosome))
        });
    }

    
    generate ( matrix ) {
        // this should be oposite for to calculate the least number, or calculate most cells covered?
        let fitnessSum = 0
        let newPopulation = [];

        for(let i = 0; i < this.population.length; i++){
            if(this.population[i].inmortal){
                this.population[i].inmortal = false;
                newPopulation.push(this.population[i])
            } 
            fitnessSum += this.population[i].fitness
        }

        this.population = this.population.sort((a, b) => (a.fitness <= b.fitness) ? 1 : -1)

        
        //add inmortals here
        // this.population - inmortal num
        for(let i = 0; i < this.population.length; i++){
            const partnerA = this.naturalSelection(fitnessSum)
            const partnerB = this.naturalSelection(fitnessSum)
            let child = partnerA.crossover(partnerB, matrix, this.sensorRange)
            child.mutate(this.mutationRate)
            newPopulation[i] = child
        }

        this.population = newPopulation;
        this.generations ++;
    }

    naturalSelection(fitnessSum){
        let naturalSelector = Math.random() * fitnessSum
        
        for(let i = 0; i < this.population.length; i++){
            fitnessSum -= this.population[i].fitness
            if(fitnessSum  < naturalSelector){
                return this.population[i]

            }
        }
    }

    getBest() {
        return this.best;
    }

    evaluate () {
        let worldrecord = 0.0;
        let index = 0;
        for(let i = 0; i < this.population.length; i++) {
            if(this.population[i].fitness > worldrecord){
                index = i;
                worldrecord = this.population[i].fitness;
            }
        }
        this.population[index].inmortal = true
        if(worldrecord >= this.perfectScore) {
            this.finished = true;
        }
    }

    isFinished() {
        return this.finished;
    }

    getGenerations() {
        return this.generations;
    }

    getAverageFitness () {
        let total = 0;
        for (let i = 0; i < this.population.length; i ++) {
            total += this.population[i].fitness;
        }
        return total/this.population.length;
    }

    allPath() {
        let everything = "";
        let displayLimit = Math.min(this.population.length, 50);

        for(let i = 0; i < displayLimit; i ++) {
            everything += this.population[i].getPhrase() + "<br>";
        }
        return everything; 
    }
}

module.exports.Population = Population;