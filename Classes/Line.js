module.exports = class Line {
    // DONT USE THIS
    constructor(a, b) {
        this.points = [a, b]
        this.points.sort()
    }

    slope() {
        let slope;

        if (this.points[1].x !== this.points[0].x)
            slope = (this.points[1].y - this.points[0].y) / (this.points[1].x - this.points[0].x);
        else
            slope = false;

        return slope;
    };

    yInt() {
        if (this.points[0].x === this.points[1].x) return this.points[0].x === 0 ? 0 : false;
        if (this.points[0].y === this.points[1].y) return this.points[0].y;
        if (this.slope() === 0 || this.slope() === false ){
            return this.points[0].y * this.points[0].x;
        } else {
            return this.points[0].y - this.slope() * this.points[0].x;
        }
    };

    xInt() {
        if (this.points[0].y === this.points[1].y) return this.points[0].y === 0 ? 0 : false;
        if (this.points[0].x === this.points[1].x) return this.points[0].x;
        if (this.slope() === 0 || this.slope() === false ){
            return (-1 * this.yInt())
        } else {
            return (-1 * this.yInt())/ this.slope();
        }
    };

    onSegment(x) {
        return (this.points[0].x <= x && x <= this.points[1].x);
    };

    collide(other) {
        if (this.slope() === other.slope()) return false;
        if (this.slope() === 0 && other.slope() === 0) return false;
        if (this.slope() === false && other.slope() === false) return false;
        let intersect = {};
        if ( this.slope() === 0 && other.slope() === false ){
            if(
                this.points[0].y >= other.points[0].y && 
                this.points[0].y <= other.points[1].y && 
                other.points[0].x >= this.points[0].x && 
                other.points[0].x <= this.points[1].x
            ){
                intersect.x = other.points[0].x
                intersect.y = this.points[0].y
            } else {
                return false
            }
        } else if( this.slope() === false && other.slope() === 0 ) {
            // console.log(this.points)
            // console.log(other.points)
            if(
                this.points[0].y <= other.points[0].y && 
                this.points[1].y >= other.points[0].y && 
                other.points[0].x <= this.points[0].x && 
                other.points[1].x >= this.points[0].x
            ){
                intersect.x = this.points[0].x
                intersect.y = other.points[0].y
            } else {
                return false
            }

        } else {
            intersect.x = (other.yInt() - this.yInt()) / (this.slope() - other.slope());
            intersect.y = this.slope() * intersect.x + this.yInt();
        }


        return intersect;
    };
}


const line1 = new Line({x: 4, y:0}, {x: 0, y: 5})
const line2 = new Line({x: 3, y:2}, {x: 3, y: 2})

console.log(line1.collide(line2))