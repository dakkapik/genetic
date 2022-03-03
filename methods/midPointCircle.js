function midPointCircle(position, radius){

    const circle =[];
    let x = radius;
    let y = 0;
    let p = radius - 1

    circle.push({x: x + position.x, y: y + position.y})

    if(radius > 0){
        circle.push({x: x + position.x, y: -y + position.y})
        circle.push({x: y + position.x, y: x + position.y})
        circle.push({x: -y + position.x, y: x + position.y})
    }

    while(x > y){
        y++
        if(p <= 0){
            p = p + 2*y + 1;
        } else {
            x --;
            p = p + 2*y - 2*x + 1;
        }

        if(x < y) break;

        circle.push({x: x + position.x, y: y + position.y})
        circle.push({x: -x + position.x, y: y + position.y})
        circle.push({x: x + position.x, y: -y + position.y})
        circle.push({x: -x + position.x, y: -y + position.y})

        if(x !== y){
            circle.push({x: y + position.x, y: x + position.y})
            circle.push({x: -y + position.x, y: x + position.y})
            circle.push({x: y + position.x, y: -x + position.y})
            circle.push({x: -y + position.x, y: -x + position.y})
        }
    }

    return circle

}

function validMidPointCircle (matrix, circleValues) {
    const EXCLUDED_VALUES = new Set()
    EXCLUDED_VALUES.add('x')
    EXCLUDED_VALUES.add('o')
    EXCLUDED_VALUES.add('k')

    const inBounds = circleValues.filter(position => (
        position.x > -1 && 
        position.x < matrix[0].length && 
        position.y > -1 && 
        position.y < matrix.length))

    return inBounds.filter(position => !EXCLUDED_VALUES.has(matrix[position.y][position.x]))
}

module.exports.validMidPointCircle = validMidPointCircle;
module.exports.midPointCircle = midPointCircle;