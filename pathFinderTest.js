let x = 0;
let y = 0;
let rightTurns = 0;
let leftTurns = 0;
const history = [];
// use cardinal directions
const DIRECTIONS = [
    "right",
    "down",
    "left",
    "up"
];

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
    let nextMove = cleanPath(exc1)
    if(nextMove === "collision"){
        console.log("collison");
        rightTurns ++;
    } else {
        history.push(nextMove);
    }
}

function cleanPath(matrix){
    //overlap here?
    switch(DIRECTIONS[(rightTurns - leftTurns) % 4]){
        case "right":
            if(matrix[y][x + 1] === undefined || matrix[y][x + 1] === 'o'){
                return "collision";
            } else {
                x++;
                matrix[y][x] = "x";
                return matrix;        
            } 
        case "down":
            if(matrix[y + 1] === undefined || matrix[y + 1][x] === 'o'){
                return "collision";
            } else {
                y ++;
                matrix[y][x] = 'x';   
                return matrix;     
            } 
        case "left":
            if(matrix[y][x - 1] === undefined || matrix[y][x - 1] === 'o'){
                return "collision";
            } else {
                x --;
                matrix[y][x] = 'x';
                return matrix;        
            } 
        case "up":
            if(matrix[y - 1] === undefined || matrix[y - 1][x] === 'o'){
                return "collision";
            } else {
                y --;
                matrix[y][x] = 'x';    
                return matrix;    
            } 

    }
}

const exc1 = [
    ['x','-','-','','-','-'],
    ['o','-','-','-','-','-'],
    ['-','-','o','o','o','-'],
    ['-','-','-','-','-','-'],
    ['-','-','-','-','-','-'],
    ['-','-','-','-','-','-'],
]
let i = 0

while (i < 20){
    move()
    i++;
}

console.log(history)