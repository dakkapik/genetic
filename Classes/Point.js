module.exports = class Point{
    constructor(x, y, symbol){
        this.x = x;
        this.y = y;
        this.f = Infinity;
        this.g = Infinity;
        this.h = 0;
        this.symbol = symbol;
        this.cameFrom = undefined;
        this.obstacle

        if(symbol === 'o') {
            this.obstacle = true
        } else {
            this.obstacle = false
        }
    }
}