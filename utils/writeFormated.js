const { createWriteStream, mkdirSync, existsSync, readdirSync} = require("fs");
const { MATRIX_STORAGE, PATH_STORAGE } = require("../global_paths.json")


function matrix (matrix, dirPath = "./public") {
    return new Promise ((resolve, reject) => {

        if (!existsSync(dirPath)) mkdirSync(dirPath);
        if (!existsSync(MATRIX_STORAGE)) mkdirSync(MATRIX_STORAGE);
    
        const testArrayNum = readdirSync(MATRIX_STORAGE).length;

        const stream = createWriteStream(MATRIX_STORAGE + `/matrix_${testArrayNum + 1}.json`);

        stream.on("error", function (err) {reject(codify(err), "WRITE_STREAM_ERROR")})
        stream.write('[\n')
        matrix.forEach((row, index)=> {
            if(matrix.length === index + 1){
                stream.write(JSON.stringify(row) + '\n')
            } else {
                stream.write(JSON.stringify(row) + ',\n')
            }
        });
        stream.write(']')

        stream.end(() => resolve("Matrix written successfully on :" + MATRIX_STORAGE + `/matrix_${testArrayNum + 1}.json`))
    })
}

function path (array, matrixName, dirPath = "./public") {
    // MAKE PATHS BETTER
    return new Promise ((resolve, reject) => {
        const PATH_MATRIX_DIR = PATH_STORAGE + "/" + matrixName
        
        if (!existsSync(dirPath)) mkdirSync(dirPath);
        if (!existsSync(PATH_STORAGE)) mkdirSync(PATH_STORAGE);
        if(!existsSync(PATH_MATRIX_DIR)) mkdirSync(PATH_MATRIX_DIR);
        
        const pathNum = readdirSync(PATH_MATRIX_DIR).length;
        const solutionPathName = PATH_MATRIX_DIR + "/solution_" + pathNum + ".json"
        
        const stream = createWriteStream(solutionPathName)

        stream.on("error", function (err) {reject( codify(err), "WRITE_STREAM_ERROR")})

        stream.write('[\n')
        array.forEach((minipath, index) => {
            if(array.length === index + 1){
                stream.write(JSON.stringify(minipath) + '\n')
            } else {
                stream.write(JSON.stringify(minipath) + ',\n')
            }
        });
        stream.write(']')

        stream.end(()=> resolve(solutionPathName))
    })
}

function codify (err, code) {
    err.code = code
    return err
}

module.exports.path = path;
module.exports.matrix = matrix;