var gameOver = false;
const player = 'X';
const computer = 'O';
var origBoard;
var turn = 0;

// grabs restart game button
var restart = document.getElementById('restart');
//grabs all squares
var squares = document.querySelectorAll('.cell');

//h4 to display win message
const winningMessage = document.getElementById('winningMessage');

function clearBoard(){
    for (var i = 0; i < squares.length; i++) {
        squares[i].innerText = '';
        squares[i].addEventListener('click', handleClick, {once: true});
        squares[i].style.removeProperty('background-color');
        squares[i].setAttribute('id', i);
    }
    winningMessage.innerText = "";
    origBoard = {
        0:0,
        1:1,
        2:2,
        3:3,
        4:4,
        5:5,
        6:6,
        7:7,
        8:8
    }
    gameOver = false;
    turn = 0;
}
restart.addEventListener('click', clearBoard);

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

clearBoard();

// initial board
// var board = [
//     [0,0,0],
//     [0,0,0],
//     [0,0,0]
// ]

// for (var i = 0 ; i < squares.length; i++){
//     squares[i].setAttribute('id', i);
//     squares[i].addEventListener('click', handleClick, {once: true});
// }

function placeMarker(cell, marker){
    cell.innerText = marker;
}

function playTurn(cellId, whichPlayer){
    origBoard[cellId] = whichPlayer;
    document.getElementById(cellId).innerText = whichPlayer;
    let gameWon = checkWin(origBoard, whichPlayer);
    if (gameWon[0] === true){
        gameOver = true;
        displayGameOver(gameWon[1], whichPlayer);
    }

    let gameDraw = checkDraw(origBoard);
    if (gameDraw){
        gameOver = true;
        displayGameDraw();
    }


}

function handleClick(cell){
    var cell = cell.target.id;
    playTurn(cell, player)
    let gameW = checkWin(origBoard, player);
    if(!gameW[0] && !checkDraw(origBoard)){
        let ind = bestMove();
        playTurn(ind, computer);
        squares[ind].removeEventListener('click', handleClick, {once: true});

    }
}

function displayGameOver(winCombo, whichplayer){
    if (whichplayer === "X"){
        var color = "pink";
        winningMessage.innerText = `You Win!`;
    }
    else{
        var color = "lightblue";
        winningMessage.innerText = `You Lose!`;
    }
    for (var i=0;i<3;i++){
        document.getElementById(winCombo[i]).style.backgroundColor = color;
    }
    for (var i=0; i < squares.length; i++){
        squares[i].removeEventListener('click', handleClick, {once: true});
    }

}

function displayGameDraw(){
    gameOver = true;
    winningMessage.innerText = "Its a DRAW! Click Restart to play again";
    for (var i=0;i<9;i++){
        document.getElementById(i).style.backgroundColor = "yellow";
    }
    for (var i=0; i < squares.length; i++){
        squares[i].removeEventListener('click', handleClick, {once: true});
    }
}

function checkWin(board, turn){
    // return winningCombos.some(combination => {
    //     return combination.every(index => {
    //         return (origBoard[index] === turn)
    //     })
    // })
    let winCombo = null;
    let foundWin = false;
    for(var i=0; i<8; i++){
        if (board[winningCombos[i][0]] === turn && board[winningCombos[i][1]] === turn && board[winningCombos[i][2]] === turn){
            winCombo = winningCombos[i];
            foundWin = true;
            break;
        }
    }
    return [foundWin, winCombo];

}

function checkDraw(origBoard){
    for(var i=0; i<9; i++){
        if(origBoard[i] === i){
            return false;
        }
    }
    return true;
}

function getAvailSpots(board){
    let a = []
    for(var i=0; i<9; i++){
        if(board[i] === i){
           a.push(board[i]);
        }
    }
    return a;
}

function bestMove(){
    return miniMax(origBoard, computer).index;
}



function miniMax(newBoard, whichplayer){
    var availSpots = getAvailSpots(newBoard);
    
    if(checkWin(newBoard, player)[0]){
        return {score: -10};
    }
    else if(checkWin(newBoard, computer)[0]){
        return {score: 10};
    }
    else if(availSpots.length === 0){
        return {score: 0};
    }

    var moves = [];

    for(var i=0;i < availSpots.length; i++){
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = whichplayer;

        if (whichplayer === computer){
            var result = miniMax(newBoard, player);
            move.score = result.score;
        }
        else{
            var result = miniMax(newBoard, computer);
            move.score = result.score;
        }
        newBoard[availSpots[i]] = move.index;
        moves.push(move);

    }
    //console.log(moves)

    var bestSpot;
    if (whichplayer === player){
        var bestScore = 10000;
        for(var j=0; j < moves.length; j++){
            if (moves[j].score < bestScore){
                bestScore = moves[j].score;
                bestSpot = j;
            }
        }
    }
    else{
        var bestScore = -10000;
        for(var j=0; j < moves.length; j++){
            if(moves[j].score > bestScore){
                bestScore = moves[j].score;
                bestSpot = j;
            }
        }

    }

    return moves[bestSpot];

}


