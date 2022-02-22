const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const aStar = require("./methods/AStar")
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/matrix', async (req, res) => {
    const matrix = req.body;

    const result = aStar(matrix);

    res.send(JSON.stringify(result));
})

app.listen(PORT, () => console.log("app listenig", PORT))