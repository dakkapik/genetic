function midPointCircle(center, radius){

    let x = radius;
    let y = 0;
    let p = 1 - radius;

    const circle = [{ x: x + center.x, y: y + center.y }];

    if(radius > 0){
        circle.push({x: center.x, y: center.y - x})
        circle.push({x: y + center.x, y: x + center.y})
        circle.push({x: -x + center.x, y: center.y})
    }

    while(x >= y){
        y++
        if(p <= 0){
            p = p + 2 * y + 1;
        } else {
            x --;
            p = p + 2 * y - 2 * x + 1;
        }

        if(x < y) break;
        
        circle.push({x: x + center.x, y: y + center.y})
        circle.push({x: -x + center.x, y: y + center.y})
        circle.push({x: x + center.x, y: -y + center.y})
        circle.push({x: -x + center.x, y: -y + center.y})
        
        if(x !== y){
            circle.push({x: y + center.x, y: x + center.y})
            circle.push({x: -y + center.x, y: x + center.y})
            circle.push({x: y + center.x, y: -x + center.y})
            circle.push({x: -y + center.x, y: -x + center.y})
        }
    }
    return circle
}

function validMidPointCircle (pos, rad, matrix) {
    const circleValues = midPointCircle(pos, rad)
    // console.log("this circle: ", circleValues)

    const EXCLUDED_VALUES = new Set()
    // EXCLUDED_VALUES.add('x')
    EXCLUDED_VALUES.add('o')
    EXCLUDED_VALUES.add('k')

    const inBounds = circleValues.filter(position => (
        position.x > -1 && 
        position.x < matrix[0].length && 
        position.y > -1 && 
        position.y < matrix.length))

    const valid = inBounds.filter(position => !EXCLUDED_VALUES.has(matrix[position.y][position.x]))

    if(valid == 0){
        const cheat = [pos]
        return cheat
    }

    return valid
}

module.exports.validMidPointCircle = validMidPointCircle;
module.exports.midPointCircle = midPointCircle;