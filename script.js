// grabs restart game button
var restart = document.getElementById('restart');
//grabs all squares
var squares = document.querySelectorAll('td');

//h4 to display win message
const winningMessage = document.getElementById('winningMessage');


var gameOver = false;
var playerTurn = 'X';
var ComputerTurn = 'O';

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

var turn = 0; //Player

//clears all squares
function clearBoard(){
    for (var i = 0; i < squares.length; i++) {
        squares[i].textContent = '';
        squares[i].addEventListener('click', handleClick, {once: true});
    }
    winningMessage.innerText = "";
    gameOver = false;
    turn = 0;
}
restart.addEventListener('click', clearBoard);

//for loop that adds event listeners to all squares
for (var i = 0 ; i < squares.length; i++){
    squares[i].setAttribute('id', i);
    squares[i].addEventListener('click', handleClick, {once: true});
}

function placeMarker(cell, turn){
    cell.textContent = turn;
}

function handleClick(e){
    // place Mark
    // check for win
    //check for draw
    //switch turns
    if(!gameOver){
        var cell = e.target;
        const curr = turn ? ComputerTurn : playerTurn
        if (curr == playerTurn){
            placeMarker(cell, curr);
            if (checkWin(curr)){
                endGame(false);
                gameOver = true;
            } else if (isDraw()){
                endGame(true)
                gameOver = true;
            } 
            else{
                turn = 1 - turn;
            }
        }
        else{
            console.log("Computer");
            var sq_copy = [...squares];
            cell = findBestMove(sq_copy);
            squares[cell].removeEventListener('click', handleClick, {once: true});
            placeMarker(cell, curr);

            if (checkWin(curr)){
                endGame(false);
                gameOver = true;
            } else if (isDraw()){
                endGame(true)
                gameOver = true;
            } 
            else{
                turn = 1 - turn;
            }
        }
        
        
    }

}



function isDraw(){
    for (var i=0; i < squares.length; i++){
        if (squares[i].textContent === ''){
            return false
        }
    }
    return true
}
function endGame(draw){
    if (draw){
        winningMessage.innerText = "Draw!";
    }
    else{
        winningMessage.innerText = `${turn ? "O's": "X's"} Wins!`
    }
    // for (var i=0; i< squares.length; i++){
    //     squares[i].removeEventListener('click', handleClick,{once: true});
    // }
}

function checkWin(turn){
    return winningCombos.some(combination => {
        return combination.every(index => {
            return (squares[index].textContent === turn)
        })
    })
}

function minMax(squares, depth, isMax){
    var score = evaluate(squares);

    if(score === 10){
        return score;
    }
    if(score === -10){
        return score;
    }
    if(isMovesLeft(squares) === false){
        return 0;
    }

    if (isMax){
        var best = -1000;
        for(var i=0;i<9;i++){
            if(squares[i].textContent === ''){
                squares[i].textContent = ComputerTurn;
                best = Math.max(best, minMax(squares, depth+1, !isMax));
                squares[i].textContent = '';
            }
        }
        return best;
    }

    else{
        var best = 1000;
        for(var i=0;i<9;i++){
            if(squares[i].textContent === ''){
                squares[i].textContent = playerTurn;
                best = Math.min(best, minMax(squares, depth+1, !isMax));
                squares[i].textContent === '';
            }
        }
        return best;
    }

}


function findBestMove(squares){
    var bestVal = -1000;
    var bestIndex = -1

    for(var i=0;i<9;i++){
        if (squares[i].textContent === ''){
            squares[i].textContent = ComputerTurn;

            var moveVal = minMax(squares, 0, false);

            squares[i].textContent = '';

            if (moveVal > bestVal){
                bestIndex = i;
                bestVal = moveVal;
            }
        }
    }
    return bestIndex;

}

function evaluate(sq){
//    wins = [[0,1,2],
//     [3,4,5],
//     [6,7,8],
//     [0,3,6],
//     [1,4,7],
//     [2,5,8],
//     [0,4,8],
//     [2,4,6]]
// 3 ROWS - START
    if (sq[0].textContent == sq[1].textContent && sq[1].textContent == sq[2].textContent){
        if(sq[0].textContent === ComputerTurn){
            return 10;
        }
        else if(sq[0].textContent === playerTurn){
            return -10;
        }
    }
    if (sq[3].textContent == sq[4].textContent && sq[4].textContent == sq[5].textContent){
        if(sq[3].textContent === ComputerTurn){
            return 10;
        }
        else if(sq[3].textContent === playerTurn){
            return -10;
        }
    }
    if (sq[6].textContent == sq[7].textContent && sq[7].textContent == sq[8].textContent){
        if(sq[6].textContent === ComputerTurn){
            return 10;
        }
        else if(sq[6].textContent === playerTurn){
            return -10;
        }
    }

    // 3 COLS - START
    if (sq[0].textContent == sq[3].textContent && sq[3].textContent == sq[6].textContent){
        if(sq[0].textContent === ComputerTurn){
            return 10;
        }
        else if(sq[0].textContent === playerTurn){
            return -10;
        }
    }
    if (sq[1].textContent == sq[4].textContent && sq[4].textContent == sq[7].textContent){
        if(sq[1].textContent === ComputerTurn){
            return 10;
        }
        else if(sq[1].textContent === playerTurn){
            return -10;
        }
    }
    if (sq[2].textContent == sq[5].textContent && sq[5].textContent == sq[8].textContent){
        if(sq[2].textContent === ComputerTurn){
            return 10;
        }
        else if(sq[2].textContent === playerTurn){
            return -10;
        }
    }

    //DIAGONALS - START
    if (sq[0].textContent == sq[4].textContent && sq[4].textContent == sq[8].textContent){
        if(sq[0].textContent === ComputerTurn){
            return 10;
        }
        else if(sq[0].textContent === playerTurn){
            return -10;
        }
    }
    if (sq[2].textContent == sq[4].textContent && sq[4].textContent == sq[6].textContent){
        if(sq[2].textContent === ComputerTurn){
            return 10;
        }
        else if(sq[2].textContent === playerTurn){
            return -10;
        }
    }

    return 0;

}

function isMovesLeft(sq){
    for (var i=0; i < sq.length; i++){
        if (sq[i].textContent === ''){
            return true;
        }
    }
    return false;
}

