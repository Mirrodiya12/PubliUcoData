// Variables globales
let currentPlayer;
let player1Symbol;
let player2Symbol;
let board;
let computerPlayer = false;

// Inicialización del juego
function startGame() {
    const player1Input = document.getElementById('player1-symbol');
    const player2Input = document.getElementById('player2-symbol');
    const startingPlayerSelect = document.getElementById('starting-player');
    const computerPlayerCheckbox = document.getElementById('computer-player');
    
    player1Symbol = player1Input.value;
    player2Symbol = player2Input.value;
    currentPlayer = startingPlayerSelect.value;
    computerPlayer = computerPlayerCheckbox.checked;
    
    if (player1Symbol && player2Symbol) {
        player1Input.disabled = true;
        player2Input.disabled = true;
        startingPlayerSelect.disabled = true;
        computerPlayerCheckbox.disabled = true;
        document.getElementById('starting-options').style.display = 'none';
        document.getElementById('board').style.display = 'grid';
        document.getElementById('reset-button').style.display = 'block';
        
        initializeBoard();
        renderBoard();
        
        if (currentPlayer === '2' && computerPlayer) {
            makeComputerMove();
        }
    } else {
        alert('Por favor, ingresa símbolos para ambos jugadores.');
    }
}

// Inicializar el tablero
function initializeBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
}

// Renderizar el tablero en el DOM
function renderBoard() {
    const cells = document.getElementsByClassName('cell');
    
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = board[i];
    }
}

// Realizar movimiento del jugador
function makeMove(index) {
    if (board[index] === '' && !isGameOver()) {
        board[index] = getPlayerSymbol();
        renderBoard();
        
        if (isGameOver()) {
            showGameOverMessage();
        } else if (computerPlayer) {
            makeComputerMove();
        } else {
            switchPlayer();
        }
    }
}

// Realizar movimiento de la computadora
function makeComputerMove() {
    if (!isGameOver()) {
        let availableMoves = getAvailableMoves();

        if (availableMoves.length > 0) {
            let randomIndex = Math.floor(Math.random() * availableMoves.length);
            let computerMove = availableMoves[randomIndex];
            board[computerMove] = player2Symbol;
            renderBoard();

            if (isGameOver()) {
                showGameOverMessage();
            } else {
                switchPlayer();
            }
        }
    }
}

// Obtener el símbolo del jugador actual
function getPlayerSymbol() {
    return currentPlayer === '1' ? player1Symbol : player2Symbol;
}

// Obtener el símbolo de la computadora
function getComputerSymbol() {
    return isAgainstComputer() ? player2Symbol : player1Symbol;
}

// Manejar el evento de clic en una celda
function handleCellClick(cellIndex) {
    if (board[cellIndex] === '') {
        if (currentPlayer === '1' || (currentPlayer === '2' && isAgainstComputer())) {
            board[cellIndex] = getPlayerSymbol();
            renderBoard();

            if (isGameOver()) {
                showGameOverMessage();
            } else {
                switchPlayer();
                if (isAgainstComputer() && currentPlayer === '2') {
                    makeComputerMove();
                }
            }
        }
    }
}

// Verificar si se está jugando contra la computadora
function isAgainstComputer() {
    return player2Symbol === 'O';
}




// Obtener los movimientos disponibles
function getAvailableMoves() {
    let availableMoves = [];
    
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            availableMoves.push(i);
        }
    }
    
    return availableMoves;
}

// Cambiar de jugador
function switchPlayer() {
    currentPlayer = currentPlayer === '1' ? '2' : '1';
}


// Verificar si el juego ha terminado
function isGameOver() {
    return (
        checkRows() ||
        checkColumns() ||
        checkDiagonals() ||
        checkTie()
    );
}

// Verificar filas
function checkRows() {
    for (let i = 0; i < 9; i += 3) {
        if (
            board[i] !== '' &&
            board[i] === board[i + 1] &&
            board[i] === board[i + 2]
        ) {
            return true;
        }
    }
    
    return false;
}

// Verificar columnas
function checkColumns() {
    for (let i = 0; i < 3; i++) {
        if (
            board[i] !== '' &&
            board[i] === board[i + 3] &&
            board[i] === board[i + 6]
        ) {
            return true;
        }
    }
    
    return false;
}

// Verificar diagonales
function checkDiagonals() {
    if (
        board[0] !== '' &&
        board[0] === board[4] &&
        board[0] === board[8]
    ) {
        return true;
    }
    
    if (
        board[2] !== '' &&
        board[2] === board[4] &&
        board[2] === board[6]
    ) {
        return true;
    }
    
    return false;
}

// Verificar empate
function checkTie() {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            return false;
        }
    }
    
    return true;
}

// Mostrar mensaje de fin de juego
function showGameOverMessage() {
    let message;
    
    if (checkTie()) {
        message = 'Empate!';
    } else {
        message = `¡Jugador ${currentPlayer} ha ganado!`;
    }
    
    setTimeout(function() {
        alert(message);
        resetBoard();
    }, 100);
}

// Reiniciar el tablero y los ajustes del juego
function resetBoard() {
    const player1Input = document.getElementById('player1-symbol');
    const player2Input = document.getElementById('player2-symbol');
    const startingPlayerSelect = document.getElementById('starting-player');
    const computerPlayerCheckbox = document.getElementById('computer-player');
    
    player1Input.disabled = false;
    player2Input.disabled = false;
    startingPlayerSelect.disabled = false;
    computerPlayerCheckbox.disabled = false;
    player1Input.value = '';
    player2Input.value = '';
    startingPlayerSelect.value = '1';
    computerPlayerCheckbox.checked = false;
    currentPlayer = '';
    player1Symbol = '';
    player2Symbol = '';
    computerPlayer = false;
    
    document.getElementById('starting-options').style.display = 'block';
    document.getElementById('board').style.display = 'none';
    document.getElementById('reset-button').style.display = 'none';
    
    initializeBoard();
    renderBoard();
}

