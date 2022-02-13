let x = 0;
let y = 0;
let negative45Turns = 0;
let positive45Turns = 0;
const history = [];

// use cardinal directions

const VECTOR = [
    "west",
    "south-west",
    "south",
    "south-east",
    "east",
    "north-east",
    "north",
    "north-west",
];

function move(){
    let direction = VECTOR[(negative45Turns - positive45Turns) % 8]
    let nextMove = cleanPath(exc1, direction)

    if(typeof nextMove === "object"){
        history.push({currentMatrix: nextMove, direction});
    } else {
        console.log(nextMove);
        if(nextMove === "collision"){
            negative45Turns = negative45Turns + 2 ;
        } else if (nextMove === "obstacle"){
            negative45Turns ++;
        } else if (nextMove === "overlap"){
            negative45Turns ++;
        }

    }
}

function cleanPath(matrix, direction){
    //overlap here?
    switch(direction){
        case "west":
            if(matrix[y][x + 1] === undefined){
                return "collision";
            } else if(matrix[y][x + 1] === 'o'){
                return "obstacle";
            } else if(matrix[y][x + 1] === 'x'){
                return "overlap";
            } else {
                x++;
                matrix[y][x] = "x";
                return matrix;        
            } 
        
        case "south-west":
            if(matrix[y + 1][x + 1] === undefined){
                return "collision";
            } else if(matrix[y + 1][x + 1] === 'o'){
                return "obstacle";
            } else if(matrix[y + 1][x + 1] === 'x'){
                return "overlap";
            } else {
                x++; y++;
                matrix[y][x] = "x";
                return matrix;        
            } 
        
        case "south":
            if(matrix[y + 1] === undefined){
                return "collision";
            } else if(matrix[y + 1][x] === 'o') {
                return "obstacle";
            } else if(matrix[y + 1][x] === 'x') {
                return "overlap";
            } else {
                y ++;
                matrix[y][x] = 'x';   
                return matrix;     
            } 

        case "south-east":
            if(matrix[y + 1] === undefined){
                return "collision";
            } else if(matrix[y + 1][x - 1] === 'o') {
                return "obstacle";
            } else if(matrix[y + 1][x - 1] === 'x') {
                return "overlap";
            } else {
                y ++; x --;
                matrix[y][x] = 'x';   
                return matrix;     
            } 

        case "east":
            if(matrix[y][x - 1] === undefined){
                return "collision";
            } else if (matrix[y][x - 1] === 'o'){
                return "obstacle";
            } else if (matrix[y][x - 1] === 'x'){
                return "overlap";
            }else {
                x --;
                matrix[y][x] = 'x';
                return matrix;        
            }

        case "north-east":
            if(matrix[y - 1][x - 1] === undefined){
                return "collision";
            } else if (matrix[y - 1][x - 1] === 'o'){
                return "obstacle";
            } else if (matrix[y - 1][x - 1] === 'x'){
                return "overlap";
            }else {
                x --; y --;
                matrix[y][x] = 'x';
                return matrix;        
            }

        case "north":
            if(matrix[y - 1] === undefined){
                return "collision";
            } else if(matrix[y - 1][x] === 'o'){
                return "obstacle";
            } else if(matrix[y - 1][x] === 'x'){
                return "overlap";
            }else {
                y --;
                matrix[y][x] = 'x';    
                return matrix;    
            } 
        
        case "north-west":
            if(matrix[y - 1] === undefined){
                return "collision";
            } else if(matrix[y - 1][x + 1] === 'o'){
                return "obstacle";
            } else if(matrix[y - 1][x + 1] === 'x'){
                return "overlap";
            }else {
                x ++; y --;
                matrix[y][x] = 'x';    
                return matrix;    
            } 

    }
}

const exc1 = [
    ['x','-','-','-','-','-'],
    ['o','-','-','-','-','-'],
    ['-','-','o','o','o','-'],
    ['-','-','-','-','-','-'],
    ['-','-','-','-','-','-'],
    ['-','-','-','-','-','-'],
]

let i = 0

while (i < 23){
    move()
    i ++;
}
console.log( x, y)
console.log(history[history.length - 1])