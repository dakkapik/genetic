function drawLine( array ){
    ctx.beginPath();
    console.log("DRAWING", array)

    let xPos = array[0].x * xRatio + (xRatio / 2)
    let yPos = array[0].y * yRatio + (yRatio / 2)

    ctx.moveTo(xPos, yPos);
    for(let i = 1; i < array.length; i++){
        xPos = array[i].x * xRatio + (xRatio / 2)
        yPos = array[i].y * yRatio + (yRatio / 2)
        ctx.lineTo(xPos, yPos)
    }
    ctx.stroke();
}