const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const aStar = require("./methods/AStar")
const app = express();
const PORT = process.env.PORT || 3000;
const { manhattamDistance } = require("./methods/heuristic")

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/matrix', async (req, res) => {
    const matrix = req.body;
    const start = {x: 0, y: 0}
    const end = {x: matrix[0].length - 1, y: matrix.length - 1}

    const result = aStar(matrix, start, end, manhattamDistance);

    res.send(JSON.stringify(result));
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