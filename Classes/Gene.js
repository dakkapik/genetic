class Gene{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.f = Infinity;
        this.g = Infinity;
        // this.h = 0;
        this.obstacle = false;
        this.cameFrom = undefined;
        // OVERLAP NOT WORKING AS INTENDED
        this.gene;
        // this.cameFromDirection = undefined;
        // add clean?
    }

    encode(rows) {
        this.gene = this.y * rows + this.x
    }

    decode(columns, gene) {
        this.gene = gene
        this.x = gene % columns
        this.y = (gene - this.x) / columns
    }
}

module.exports.Gene = Gene;