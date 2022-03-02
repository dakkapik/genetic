fetch("http://localhost:3000/path.json")
.then(response =>response.json())
.then(data => {
    data.forEach((path, index) => {
        path.forEach(position => {
            const cell = document.getElementById(`${position.x}-${position.y}`)
            cell.style.backgroundColor = `rgba(${index * 4}, 160, 160)`
            matrix[position.y][position.x] = 'x'
            if(position.overlap) cell.style.backgroundColor = '#ffff00'
            if(position.cameFrom){
                if(position.cameFrom.x === position.x){
                    if(position.cameFrom.y > position.y){
                        cell.innerHTML = `↑${index}`
                    }else {
                        cell.innerHTML = `↓${index}`
                    }
                } else {
                    if(position.cameFrom.x > position.x){
                        cell.innerHTML = `←${index}`
                    } else {
                        cell.innerHTML = `→${index}`
                    }
                }
            }
            // cell.innerHTML = index
        });
    });
})
.catch(err =>console.error(err))