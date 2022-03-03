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
        document.getElementById('path-length-display').innerHTML = data.length
        let red = 100; let green = 40; let blue = 40;
        let increaser = 0;
        const MULTIPLIER = 10
    
        data.forEach((path, index) => {
            if(red < 255){
                red = red + (increaser * MULTIPLIER)
                if(red > 255) increaser = 0
            } else if(green < 255){
                green = green + (increaser * MULTIPLIER)
                if(green > 255) increaser = 0
            } else {
                blue = blue + (increaser * MULTIPLIER)
                if(blue > 255){
                    increaser = 0
                    red = 40
                }
            }
            increaser ++;
            path.forEach(position => {
                const cell = document.getElementById(`${position.x}-${position.y}`)
                cell.style.backgroundColor = `rgba(${red}, ${green}, ${blue})`
                matrix[position.y][position.x] = 'x'
                // if(position.overlap) cell.style.backgroundColor = '#ffff00'
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

