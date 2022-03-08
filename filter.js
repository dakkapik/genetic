const { writeFile } = require('fs')

const path = require("./public/path/matrix_13/solution_4.json")
const newPath = path.map((minipath) => {
    return minipath.map(point => {return {x: point.x, y: point.y}})
})

writeFile('test.json', JSON.stringify(newPath, null, 2), (err)=>{if(err)console.error(err)})