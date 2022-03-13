function midPointCircle(position, radius){

    const circle = [];
    let x = radius;
    let y = 0;
    let p = radius - 1
    let currentPoint = { x: x + position.x, y: y + position.y }
    if(currentPoint.x == NaN) console.log(currentPoint)

    circle.push(currentPoint)

    if(radius > 0){
        currentPoint = {x: x + position.x, y: -(y + position.y)}
        if(currentPoint.x == NaN) console.log(currentPoint)
        circle.push(currentPoint)
        currentPoint = {x: y + position.x, y: x + position.y}
        if(currentPoint.x == NaN) console.log(currentPoint)
        circle.push(currentPoint)
        currentPoint = {x: -(y + position.x), y: x + position.y}
        if(currentPoint.x == NaN) console.log(currentPoint)
        circle.push(currentPoint)
    }

    while(x > y){
        y++
        if(p <= 0){
            p = p + 2 * y + 1;
        } else {
            x --;
            p = p + 2 * y - 2 * x + 1;
        }
        
        if(x < y) break;
        
        currentPoint = {x: x + position.x, y: y + position.y}
        if(currentPoint.x == NaN) console.log(currentPoint)
        circle.push(currentPoint)
        currentPoint = {x: -1*x + position.x, y: y + position.y}
        if(currentPoint.x == NaN) console.log(currentPoint)
        circle.push(currentPoint)
        currentPoint = {x: x + position.x, y: -(y + position.y)}
        if(currentPoint.x == NaN) console.log(currentPoint)
        circle.push(currentPoint)
        currentPoint = {x: -1*x + position.x, y: -1* y + position.y}
        if(currentPoint.x == NaN) console.log(currentPoint)
        circle.push(currentPoint)
        
        if(x !== y){
            currentPoint = {x: y + position.x, y: x + position.y}
            if(currentPoint.x == NaN) console.log(currentPoint)
            circle.push(currentPoint)
            currentPoint = {x: -1*y + position.x, y: x + position.y}
            if(currentPoint.x == NaN) console.log(currentPoint)
            circle.push(currentPoint)
            currentPoint = {x: y + position.x, y: -1*x + position.y}
            if(currentPoint.x == NaN) console.log(currentPoint)
            circle.push(currentPoint)
            currentPoint = {x: -1*y + position.x, y: -1*x + position.y}
            if(currentPoint.x == NaN) console.log(currentPoint)
            circle.push(currentPoint)
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