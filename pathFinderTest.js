module.exports = function (incomingMatrix, historyLength) {
    let x = 0;
    let y = 0;
    let negative45Turns = 0;
    let positive45Turns = 0;
    const matrix = incomingMatrix;
    
    matrix[y][x] = 'x';
    
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

    const history = [{
        currentMatrix: JSON.stringify(matrix), 
        direction: VECTOR[(negative45Turns - positive45Turns) % 8 ] 
    }];
    
    move(historyLength);
    return history;
    

    function move(moveAmount){
        let iterator = 0;
        if(!moveAmount) moveAmount = 1;

        while(iterator < moveAmount){
            const direction = VECTOR[(negative45Turns - positive45Turns) % 8];
            const newMatrix = cleanPath(matrix, direction);
    
            if(typeof newMatrix === "object"){
                
                history.push({currentMatrix: JSON.stringify(newMatrix), direction})
        
            } else {
                if(newMatrix === "collision"){
                    negative45Turns = negative45Turns + 2 ;
                } else if (newMatrix === "obstacle"){
                    negative45Turns ++;
                } else if (newMatrix === "overlap"){
                    negative45Turns ++;
                }
        
            }
            iterator ++;
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
    };
};


