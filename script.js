let resetButton = document.getElementById("reset-button");
let cells = document.querySelectorAll(".cell");

resetButton.addEventListener("click", function() {
    location.reload();
})

cells.forEach(cell => {
    cell.addEventListener("click", function() {
        if(!gameFlow) {
            gameFlow.playRounds(playingBoard);
            const cellIndex = parseInt(cell.getAttribute('data-index'));
            cell.textContent = "X";
            gameFlow.takePlays(cellIndex, "player1", playingBoard);
        } else {
            if(gameFlow.gameOver) return;
            if(gameFlow.counter % 2 === 0) {
                const cellIndex = parseInt(cell.getAttribute('data-index'));
                cell.textContent = "X";
                gameFlow.takePlays(cellIndex, "player1", playingBoard);
            } else {
                const cellIndex = parseInt(cell.getAttribute('data-index'));
                cell.textContent = "O";
                gameFlow.takePlays(cellIndex, "player2", playingBoard);
            }
        }
    });
});

let gameboard = {
    board: [],
    initBoard: function() {
        this.board = Array(3).fill().map(() => Array(3).fill(null));
        return this.board;
    }
}

let plays = {
    history: [],
    addPlay: function(user, move) {
        this.history.push({ user: user, move: move });
    },
    getPlays: function() {
        return this.history;
    }
}

let gameFlow = {
    counter: 0,
    gameOver: false,
    cellsToArray: function(cellIndex) {
        if (cellIndex === 0) return [0, 0];
        if (cellIndex === 1) return [0, 1];
        if (cellIndex === 2) return [0, 2];
        if (cellIndex === 3) return [1, 0];
        if (cellIndex === 4) return [1, 1];
        if (cellIndex === 5) return [1, 2];
        if (cellIndex === 6) return [2, 0];
        if (cellIndex === 7) return [2, 1];
        if (cellIndex === 8) return [2, 2];
    },
    takePlays: function (cellIndex, player, board) {
        for (i = 0; i < 9; i++) {
            if (this.gameOver) break;
            let winner = this.checkWinner(board);
            if (winner === "player1" || winner === "player2") {
                this.gameOver = true;
                document.getElementById('status').textContent = `${winner} wins!`;
            } else {
                let play = this.cellsToArray(cellIndex);   
                    plays.addPlay(player, play);
                    let [row, col] = play;
                    board[row][col] = player === "player1" ? "X" : "O";
                    if(player === "player1") {
                        document.getElementById('status').textContent = `Player 2's Turn (O)!`;
                    } else {
                        document.getElementById('status').textContent = `Player 1's Turn (X)!`;
                    }
                    this.counter++;
                }
            }
        },
    checkWinner: function(board) {
        if(board[0][0] == "X" && board[0][1] == "X" && board[0][2] == "X") {
            return "player1";
        } else if(board[0][0] == "O" && board[0][1] == "O" && board[0][2] == "O") {
            return "player2";
        } else if(board[1][0] == "X" && board[1][1] == "X" && board[1][2] == "X") {
            return "player1";
        } else if(board[1][0] == "O" && board[1][1] == "O" && board[1][2] == "O") {
            return "player2";
        } else if(board[2][0] == "X" && board[2][1] == "X" && board[2][2] == "X") {
            return "player1";
        } else if(board[2][0] == "O" && board[2][1] == "O" && board[2][2] == "O") {
            return "player2";
        } else if(board[0][0] == "X" && board[1][0] == "X" && board[2][0] == "X") {
            return "player1";
        } else if(board[0][0] == "O" && board[1][0] == "O" && board[2][0] == "O") {
            return "player2";
        } else if(board[0][1] == "X" && board[1][1] == "X" && board[2][1] == "X") {
            return "player1";
        } else if(board[0][1] == "O" && board[1][1] == "O" && board[2][1] == "O") {
            return "player2";
        } else if(board[0][2] == "X" && board[1][2] == "X" && board[2][2] == "X") {
            return "player1";
        } else if(board[0][2] == "O" && board[1][2] == "O" && board[2][2] == "O") {
            return "player2";
        } else if(board[0][0] == "X" && board[1][1] == "X" && board[2][2] == "X") {
            return "player1";
        } else if(board[0][0] == "O" && board[1][1] == "O" && board[2][2] == "O") {
            return "player2";
        } else if(board[0][2] == "X" && board[1][1] == "X" && board[2][0] == "X") {
            return "player1";
        } else if(board[0][2] == "O" && board[1][1] == "O" && board[2][0] == "O") {
            return "player2";
        }
        return null;
    }
}


let playingBoard = gameboard.initBoard();