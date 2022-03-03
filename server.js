const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const aStar = require("./methods/AStar")
const app = express();
const PORT = process.env.PORT || 3000;
const { manhattamDistance } = require("./methods/heuristic")
const { createWriteStream, readdirSync} = require("fs")

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))

app.post('/matrix', async (req, res) => {
    const matrix = req.body;
    // if no dir, create it
    const testArrayNum = readdirSync('./public/testArray').length;

    const stream = createWriteStream(`./public/testArray/matrix_${testArrayNum + 1}.json`);

    stream.write('[\n')
    matrix.forEach((row, index)=> {
        if(matrix.length === index + 1){
            stream.write(JSON.stringify(row) + '\n')
        } else {
            stream.write(JSON.stringify(row) + ',\n')
        }
    });
    stream.write(']')

    stream.end(() => res.status(200))
})

app.get('/', async (req, res) => {
    // const matrix = req.body;
    const matrix = require("./testArray/hardArray.json")
    const start = {x: 0, y: 0}
    const end = {x: matrix[0].length - 1, y: matrix.length - 1}

    const result = aStar(matrix, start, end, manhattamDistance);

    res.send(JSON.stringify(result));
})

app.listen(PORT, () => console.log("app listenig", PORT))