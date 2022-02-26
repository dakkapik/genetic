function randomByRadius(matrix, radius){
    const height = matrix.length;
    const width = matrix[0].length;
    const angle = Math.random()

    const x = Math.floor(Math.cos(angle) * radius)
    
    const y = Math.floor(Math.sin(angle) * radius)

}