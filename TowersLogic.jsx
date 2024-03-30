const baseSolution = ([[2, 1, 5, 3, 4],
                       [4, 5, 3, 2, 1],
                       [3, 4, 1, 5, 2],
                       [1, 3, 2, 4, 5],
                       [5, 2, 4, 1, 3]])

                       
// Hieronder staan de functies om een nieuwe oplossing te genereren op basis van de bovenste oplossing. //

export const generateSolution = () => {
    // console.log("base solution: ")
    // console.log(baseSolution)
    const iterations = 10
    let randomize = baseSolution
    const randomRowsSolution = randomizeRows(randomize, iterations)
    const randomSolution = randomizeColumns(randomRowsSolution, iterations)
    // const solutionObjectArray = []
    // {row: 0, column: 0, value: 0}


    return randomSolution
}

function randomizeRows(FieldToRandomize, iterations) {
    const randomizedRows = FieldToRandomize;

    for (let i = 0; i < iterations; i++) {
        const randomPositionX1 = Math.floor(Math.random() * 5)
        const randomPositionX2 = Math.floor(Math.random() * 5)

        let temp = randomizedRows[randomPositionX1]
        randomizedRows[randomPositionX1] = randomizedRows[randomPositionX2]
        randomizedRows[randomPositionX2] = temp
    }

    return randomizedRows
}

function randomizeColumns(fieldToRandomize, iterations) {
    const randomizedColumns = fieldToRandomize

    for (let i = 0; i < iterations; i++) {
        const randomPositionY1 = Math.floor(Math.random() * 5)
        const randomPositionY2 = Math.floor(Math.random() * 5)
        let temp = []

        for (let j = 0; j < 5; j++) {

            temp.push(randomizedColumns[j][randomPositionY1])
            randomizedColumns[j][randomPositionY1] = randomizedColumns[j][randomPositionY2]
            randomizedColumns[j][randomPositionY2] = temp[j]
        }
        temp = [];
    }

    return randomizedColumns
}


// Deze functie print een veld uit in de console. Handig bij het debuggen van de generateSolution functie. 
export const printField = function printField(field) {
    for (let i = 0; i < 5; i++) {
        console.log(field[i])
    }
}

// Hieronder worden, aan de hand van de oplossing, de hints gegenereerd die om het veld staan // 

export const checkNumberOfTowers = function checkNumberOfTowers(field) {  
    let top = checkTop(field);
    let right = checkRight(field); 
    let bottom = checkBottom(field);
    let left = checkLeft(field);       
    
    let positions = []
   
    for (let i = 0; i < 20;) { 
        for (let j = 0; j < 5; j++) { 
            if (i < 5) { 
                positions.push(top[j])
                i++
            } else if (i >= 5 && i < 10) {
                positions.push(right[j])
                i++
            } else if (i >= 10 && i < 15) { 
                positions.push(bottom[j])
                i++
            } else if (i >= 15 && i < 20) {   
                positions.push(left[j])
                i++
            }
        }
    }
    return positions 
}

function checkLeft(field) {
    let visibleLeft = []; 
    let visibleLeftRow = 1; 
    
    for (let i = 0; i < 5; i++) {
        let highestTower = field[i][0]; 
        
        for (let j = 1; j < 5; j++) {
            if (field[i][0] == 5) {
                break;
            } else if (field[i][j] == 5) {
                visibleLeftRow++;
                break;
            } else if (field[i][j] > highestTower) {
                highestTower = field[i][j]; 
                visibleLeftRow++;
            } 
        }
        visibleLeft.push(visibleLeftRow);
        visibleLeftRow = 1; 
        // console.log("visible left: " + visibleLeft)
    }
    return visibleLeft;
}

function checkRight(field) {
    let visibleRight = []; 
    let visibleRightRow = 1;
    
    for (let i = 0; i < 5; i++) {
        let highestTower = field[i][4];
        
        for (let j = 3; j >= 0; j--) {
            if (field[i][4] == 5) {
                break;
            } else if (field[i][j] == 5) {
                visibleRightRow++
                break;
            } else if (field[i][j] > highestTower) {
                highestTower = field[i][j]; 
                visibleRightRow++
            } 
        }
        visibleRight.push(visibleRightRow)
        visibleRightRow = 1; 
    }
    return visibleRight;
}

function checkTop(field) {
    // console.log("Check top: " + field)
    let visibleTop = []; 
    let visibleTopRow = 1; 
    
    for (let i = 0; i < 5; i++) {
        let highestTower = field[0][i]; 
        
        for (let j = 1; j < 5; j++) {
            if (field[0][i] == 5) {
                break
            } else if (field[j][i] == 5) {
                visibleTopRow++
                break
            } else if (field[j][i] > highestTower) {
                highestTower = field[j][i]
                visibleTopRow++
            } 
        }
        visibleTop.push(visibleTopRow)
        visibleTopRow = 1; 
    }
    return visibleTop
}    

function checkBottom(field) {
    let visibleBottom = []
    let visibleBottomRow = 1
    
    for (let i = 0; i < 5; i++) {
        let highestTower = field[4][i] 
        
        for (let j = 3; j >= 0; j--) {
            if (field[4][i] == 5) {
                break
            } else if (field[j][i] == 5) {
                visibleBottomRow++;
                break
            } else if (field[j][i] > highestTower) {
                highestTower = field[j][i]
                visibleBottomRow++
            } 
        }
        visibleBottom.push(visibleBottomRow)
        visibleBottomRow = 1
    }
    return visibleBottom;
}

// Hieronder staan functies die het antwoord van de speler vergelijken met de verwachte uitkomst. // 

export const checkAnswer = function checkAnswer(playersAnswers, solution) {
    let userInput = checkNumberOfTowers(playersAnswers)
    let answers = checkNumberOfTowers(solution)
    
    //check if user input meets Towers criteria (every number from 1-5 used in a row/column, without doubles)
    if (checkRowCriteria(playersAnswers)) {
        if (checkColumnCriteria(playersAnswers)){
            for (let i = 0; i < answers.length; i++) { 
                if (answers[i] != userInput[i]) {
                    console.log("You lose!")
                    return false; 
                }
            }
        } else {
            return false;
        }
    } else {
        return false; 
    }
    console.log("You win!")
    return true; 
}

function checkRowCriteria(playersAnswers) { 
    //Checks if every value from 1-5 exists in a row
    console.log("players answers in check rows: ")
    console.log(playersAnswers)
           
    for (let i = 0; i < 5; i++) { 
        let rowToCheck = [] 
        rowToCheck.push(playersAnswers[i])
        // console.log("row to check: ")
        // console.log(rowToCheck)
        rowToCheck.sort()
        // console.log("row to check sorted: ")
        // console.log(rowToCheck)
        
        for (let j = 1; j < 5; j++) {
            //check for double values
            if(rowToCheck[0][j] == rowToCheck[0][j - 1]) {
                console.log("Your rows do not meet the Towers criteria.");
                return false; 
            }
        } 
    }
    console.log("Your rows meet the Towers criteria.");
    return true;
}

function checkColumnCriteria(playersAnswers) {
    //Checks if every value from 1-5 exists in a column
    console.log("players answers in check columns: ")
    console.log(playersAnswers)

    for (let i = 0; i < 5; i++) { 
        let columnToCheck = []
        columnToCheck.push(getColumn(playersAnswers, i))
        columnToCheck.sort()
        
        for (let j = 1; j < 5; j++) {
            if(columnToCheck[0][j] == columnToCheck[0][j - 1]) {
                console.log("Your columns do not meet the Towers criteria.");
                return false; 
            }
        } 
    }
    console.log("Your columns meet the Towers criteria.");
    return true;        
}

function getColumn(playersAnswers, columnNumber) {
    let userInput = []
    userInput.push(playersAnswers)
    console.log("players answers in get columns: ")
    console.log(userInput)
    let c = [];
    
    for (let i = 0; i < 5; i++) {
        c.push(userInput[0][i][columnNumber]) 
        // console.log("user input: " + userInput[0][i])
    }
    

    return c;
}