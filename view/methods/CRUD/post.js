postButton.addEventListener("click", () => {
    const requestString = HOST + "matrix";
    const stringifiedArray = JSON.stringify(matrix);

    fetch(requestString , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: stringifiedArray,
    })
    .then(response => response.json())
    .then(body => console.log(body))
    .catch((error) => {
      console.error('Error:', error);
    });
})