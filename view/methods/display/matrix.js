function updateMatrixByPoint(point, state){
    matrix[point.y][point.x] = state
    updateMatrixDisplay(matrix)
}
