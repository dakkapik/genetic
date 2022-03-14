module.exports = ( MATRIX ) => {
    return new Promise((resolve, reject) => {
        const Population = require("./Classes/Population")
        let iterator = 0;
        const history = [];

        const POPULATION_LENGTH = 20;
        const MAX_ITERATIONS = 20;
        //maybe change it to amount of avalible spaces?
        const MUTATION_RATE = 0.2;

        let currentGen = new Population(MUTATION_RATE, POPULATION_LENGTH, MATRIX)
        try {
            // setUp();
            // while(iterator < MAX_ITERATIONS){
            //     currentGen.generate(MATRIX);
            //     // Calculate fitness
            //     currentGen.calcFitness();
                
            //     currentGen.evaluate();
                
            //     // If we found the target phrase, stop
            //     // if (currentGen.isFinished()) {
            //     //     console.log("GENERATIONS: ", currentGen.getGenerations())
            //     //     console.log(JSON.parse(history))
            //     // }
                    
                
            //     history.push(JSON.stringify(currentGen))
            //     iterator++
            //     if(iterator >= MAX_ITERATIONS) resolve(history)
            // }
            // resolve(history)
        } catch (err){
            reject(err)
        }

        function setUp () {
            //POPULATION AMOUNT INCREASES SPEED
            
            currentGen = new Population(MUTATION_RATE, POPULATION_LENGTH, MATRIX)
            
            //Create next generation
            currentGen.generate(MATRIX);
            // Calculate fitness
            currentGen.calcFitness();
            
            currentGen.evaluate();
            
            
            history.push(JSON.stringify(currentGen))
        }
    })
}

