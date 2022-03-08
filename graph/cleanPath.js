// MAKE ARRAY SELECTOR FROM DB?
const cleanPathButton = document.getElementById("clean-path-button")
const cleanPathVisualButton = document.getElementById("clean-path-visual-button")
// const historySlider = document.getElementById("history-slider")

cleanPathButton.addEventListener("click", fetchCleanPath)
cleanPathVisualButton.addEventListener("click", fetchCleanPathVisual)

const MATRIX_ID = "matrix_1"
const COLOR_PACKAGE = ['#F6110D','#F2F60D','#0D7EF6', '#7EF60D']
const OVERLAP_COLOR = '#F60DF2'

let dataBank

function fetchCleanPath () {
    fetch("http://localhost:3000/matrixStorage/matrix_1.json")
    .then(response =>response.json())
    .then(data => updateMatrixDisplay(data))
    .catch(err =>console.error(err))

    
    // MAKE SOMETHING TO LINK PATH TO MATRIX
    fetch("http://localhost:3000/path/matrix_1/solution_0.json")
    .then(response =>response.json())
    .then(data => {
        dataBank = data
        historySlider.max = data.length;

        document.getElementById('path-length-display').innerHTML = data.length
    
        data.forEach((path, index) => {
            path.forEach(position => {
                const cell = document.getElementById(`${position.x}-${position.y}`)

                cell.style.backgroundColor = COLOR_PACKAGE[index % COLOR_PACKAGE.length]
                matrix[position.y][position.x] = 'x'
                if(position.overlap) cell.style.backgroundColor = OVERLAP_COLOR
                // TO CHECK OVERLAP ^^^^^
                if(position.cameFrom){
                    if(position.cameFrom.x === position.x){
                        if(position.cameFrom.y > position.y){
                            cell.innerHTML = index
                            // + '↑'
                        }else {
                            cell.innerHTML = index
                            // + '↓'
                        }
                    } else {
                        if(position.cameFrom.x > position.x){
                            cell.innerHTML = index
                            // + '←'
                        } else {
                            cell.innerHTML = index
                            // + '→'
                        }
                    }
                }
            });
        });
    })
    .catch(err =>console.error(err))
}


function fetchCleanPathVisual() {
    fetch("http://localhost:3000/matrixStorage/matrix_13.json")
    .then(response =>response.json())
    .then(data => updateMatrixDisplay(data))
    .catch(err =>console.error(err))

    
    // MAKE SOMETHING TO LINK PATH TO MATRIX
    fetch("http://localhost:3000/path/matrix_13/solution_4.json")
    .then(response =>response.json())
    .then(data => {
        console.log(data)
        document.getElementById("path-visual-length-display").innerHTML = data.length
        let i = 0
        let j = 0
        const interval = setInterval(()=> {
            deltaCell(data[i][j], i)
            j++
            if(j > data[i].length - 1){
                j = 1;
                i++;
            }
            if(i > data.length - 1) clearInterval(interval)
        }, 100)
    })
    .catch(err =>console.error(err))
}




function deltaCell (position, index){
    const cell = document.getElementById(`${position.x}-${position.y}`)
    cell.style.backgroundColor = COLOR_PACKAGE[index % COLOR_PACKAGE.length]
    matrix[position.y][position.x] = 'x'
    if(position.overlap) cell.style.backgroundColor = OVERLAP_COLOR
    // TO CHECK OVERLAP ^^^^^
    if(position.cameFrom){
        if(position.cameFrom.x === position.x){
            if(position.cameFrom.y > position.y){
                cell.innerHTML = index
                // + '↑'
            }else {
                cell.innerHTML = index
                // + '↓'
            }
        } else {
            if(position.cameFrom.x > position.x){
                cell.innerHTML = index
                // + '←'
            } else {
                cell.innerHTML = index
                // + '→'
            }
        }
    }
}