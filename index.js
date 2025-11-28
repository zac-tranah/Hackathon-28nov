const board = document.getElementById("board"); //get the board element from the DOM
const squares = document.getElementsByClassName("square"); //get all elements with class 'square' from the DOM
const players = ["X", "O"]; // 2 players: X and O in an array
let currentPlayer = players[0]; //set the current player to X

const endMessage = document.createElement("h2"); 
//create new html element 'h2'
endMessage.textContent = `X's turn!`; 
endMessage.style.marginTop = "30px"; // styling
endMessage.style.textAlign = "center";
board.after(endMessage); //insert the h2 element after the board element in the DOM

for (let i = 0; i < squares.length; i++) {
  //loop through each square
  squares[i].addEventListener("click", () => { 
    //add click event listener to each square
    if (squares[i].textContent !== "") {
      //if the square is already filled
      return;
    }
    squares[i].textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
      endMessage.textContent = `Game over! ${currentPlayer} wins!`;
      return;
    }
    if (checkTie()) {
      endMessage.textContent = `Game is tied!`;
      return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X"; //switch players
    endMessage.textContent = `${currentPlayer}'s turn!`;
  });
}


//list of all possible winning combinations 
const winning_combinations= [
    [0,1,2], //top row
    [3,4,5], //middle row
    [6,7,8], //bottom row
    [0,3,6], //left column
    [1,4,7], //middle column
    [2,5,8], //right column
    [0,4,8], //left-to-right diagonal
    [2,4,6] //right-to-left diagonal
];

//check if a player has won
const checkWin = (currentPlayer) => {
    //some returns true if any winning combination is satisfied
    return winning_combinations.some(([a, b, c]) => 
        //check if all 3 squares contain the same player's symbol
        squares[a].textContent === currentPlayer &&
        squares[b].textContent === currentPlayer &&
        squares[c].textContent === currentPlayer
    )
}

//check if the game is a tie
function checkTie() {
    //if either player has already won, it is not a tie
    if (checkWin('X') || checkWin('O')) {
        return false;
    }
    //loop over all squared to check if any are still empty
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].textContent === '') {
            return false;
        }
    }
    //if board is full and nobody won, it is a tie
    return true;
}

//function to reset the game back to the starting state
function restartButton() {
    //clear each square on the board
    squares.forEach(square => {
        square.textContent = "";
        square.classList.remove("win");
    });

    //reset to starting player 
    currentPlayer = players[0];
    //update the message displayed to the user
    endMessage.textContent = `${currentPlayer}'s turn!`;
}
