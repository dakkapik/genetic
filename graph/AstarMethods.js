function updateMatrixByPoint(point, state){
    matrix[point.y][point.x] = state
    updateMatrixDisplay(matrix)
}

function euclidianDistance (current, goal){
    return Math.hypot(Math.abs( current.x - goal.x ), Math.abs( current.y - goal.y ))
}

function manhattamDistance(current, goal){
    return Math.abs(current.x - goal.x) + Math.abs(current.y - goal.y)
}