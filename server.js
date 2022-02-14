const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pathFinderTest = require("./pathFinderTest");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/:historyLength', async (req, res) => {
    const historyLength = req.params.historyLength;
    const matrix = req.body;

    const result = pathFinderTest(matrix, historyLength);

    res.send(result);
})

app.listen(PORT, () => console.log("app listenig", PORT))