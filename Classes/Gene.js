module.exports = class Gene{
    constructor(x, y, rows){
        this.x = x;
        this.y = y;
        this.code;
        this.cleanedBy = [];

        this.encode( rows )
        // console.log("CODE: ", this.code)
        // this.f = Infinity;
        // this.g = Infinity;
        // this.h = 0;
        // this.obstacle = false;
        // this.cameFrom = undefined;
        // this.cameFromDirection = undefined;
        // add clean?
    }

    encode(rows) {
        this.code = this.y * rows + this.x
    }

    decode(columns, gene) {
        this.code = gene
        this.x = gene % columns
        this.y = (gene - this.x) / columns
    }
}