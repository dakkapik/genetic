// MAKE ARRAY SELECTOR FROM DB?
const cleanPathButton = document.getElementById("clean-path-button")
cleanPathButton.addEventListener("click", fetchCleanPath)

function fetchCleanPath () {
    fetch("http://localhost:3000/current_matrix.json")
    .then(response =>response.json())
    .then(data => updateMatrixDisplay(data))
    .catch(err =>console.error(err))

    
    // MAKE SOMETHING TO LINK PATH TO MATRIX
    fetch("http://localhost:3000/path.json")
    .then(response =>response.json())
    .then(data => {
        const COLOR_PACKAGE = ['#F6110D','#F2F60D','#0D7EF6', '#7EF60D']
        const OVERLAP_COLOR = '#F60DF2'
        document.getElementById('path-length-display').innerHTML = data.length
    
        data.forEach((path, index) => {
            path.forEach(position => {
                const cell = document.getElementById(`${position.x}-${position.y}`)
                console.log(COLOR_PACKAGE[index % COLOR_PACKAGE.length])
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

