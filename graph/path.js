let color = 1

fetch("http://localhost:3000/path.json")
.then(response =>response.json())
.then(data => {
    data.forEach((path, index) => {
        path.forEach(position => {
            const cell = document.getElementById(`${position.x}-${position.y}`)
            // cell.style.backgroundColor = `rgba(${color * 5}, 0, 0)`
            cell.innerHTML = index
            color ++;
        });
    });
})
.catch(err =>console.error(err))