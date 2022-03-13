const editTerrainCheckbox = document.getElementById("edit-terrain-checkbox")
let terrainEdit = false
let ctx
let xRatio
let yRatio

setCanvas()

editTerrainCheckbox.addEventListener("change", (e) => {
    terrainEdit = !terrainEdit
    if(terrainEdit){
        removeCanvas()
    }else {
        setCanvas()
    }
})

function setCanvas() {
    const canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.className = "canvas";
    canvas.style.position = "absolute";
    document.getElementById("matrix-container").prepend(canvas);

    ctx = canvas.getContext("2d");

    xRatio = GRAPH_WIDTH / columns;
    yRatio = GRAPH_HEIGHT / rows;

    ctx.canvas.width = GRAPH_WIDTH;
    ctx.canvas.height = GRAPH_HEIGHT;

    ctx.lineWidth =  4;
}

function removeCanvas() {
    const canvas = document.getElementById("canvas")
    document.getElementById("matrix-container").removeChild(canvas)
}
