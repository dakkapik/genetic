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

function getCurrentGeneticData() {
    return new Promise(async (resolve, reject) => {
        const fetchString = HOST + "genetic"
        const stringifiedMatrix = JSON.stringify(matrix)
        console.log("SENDING CURRENT MATRIX...")
        fetch(fetchString, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: stringifiedMatrix,
          })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}

// function getMatrix() {
//     console.log(JSON.stringify(matrix))
//   }