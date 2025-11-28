const board = document.getElementById("board"); //get the board element from the DOM
const squares = document.getElementsByClassName("square"); //get all elements with class 'square' from the DOM
const players = ["X", "O"]; // 2 players: X and O in an array
let currentPlayer = players[0]; //set the current player to X

const endMessage = document.createElement("h2"); //create new html element 'h2'
endMessage.textContent = `X's turn!`; //set the text content of the h2 element
endMessage.style.marginTop = "30px"; // styling element
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
