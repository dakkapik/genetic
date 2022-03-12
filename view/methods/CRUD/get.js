fetch(HOST)
.then(responce => responce.json())
.then(data => {
    matrixStorage = data
    updateMatrixDisplay(data[0].body)
    matrix = data[0].body
    data.forEach((matrix, index)=> {
        const option = document.createElement('option')
        option.innerHTML = matrix.name
        option.value = index
        matrixSelect.append(option)
    });
})
.catch(err => console.error(err))

startButton.addEventListener("click", ()=>{
    const fetchString = HOST + "genetic"
    fetch(fetchString)
    .then(response => response.json())
    .then(data => {
        history = data
    })
    .catch(err => console.error(err))
})

// function getMatrix() {
//     console.log(JSON.stringify(matrix))
//   }
  
  