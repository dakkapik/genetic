const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
const writeFormated = require("./utils/writeFormated");
const { fetchAllMatrix } = require("./fetch/matrix")
const genetic = require("./main")

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))

app.post('/matrix', async (req, res) => {
    try {
        const matrix = req.body;
        const result = await writeFormated.matrix(matrix)
        res.send(JSON.stringify(result)).status(200)
        
    } catch (err){
        res.send(err).status(400)
    }
})

app.post('/genetic', async (req, res) => {
    try {
        const matrix = req.body
        const history = await genetic(matrix)

        res.send(JSON.stringify(history)).status(200)

    } catch (err){
        console.error(err)
        res.send(err).status(400)
    }
})


app.get('/', async (req, res) => {
    const data = fetchAllMatrix()
    res.send(JSON.stringify(data)).status(200)
})

app.listen(PORT, () => console.log("app listenig", PORT))