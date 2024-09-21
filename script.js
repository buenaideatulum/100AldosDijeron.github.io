let countdown;
let isGameActive = false;
let firstPressed = null;

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('redButton').addEventListener('click', () => buttonPressed('red'));
document.getElementById('blueButton').addEventListener('click', () => buttonPressed('blue'));

function startGame() {
    if (isGameActive) return;

    isGameActive = true;
    countdown = 3;
    document.getElementById('startButton').disabled = true;
    const interval = setInterval(() => {
        if (countdown > 0) {
            document.getElementById('startButton').textContent = countdown;
            countdown--;
        } else {
            clearInterval(interval);
            document.getElementById('startButton').textContent = '¡Empezar!';
            document.getElementById('bellSound').play();
            firstPressed = null; // Reset first pressed
            isGameActive = false;
            document.getElementById('startButton').disabled = false;
        }
    }, 1000);
}

function buttonPressed(color) {
    if (firstPressed) return; // Solo un botón puede ser presionado primero
    firstPressed = color;

    if (color === 'red') {
        document.getElementById('soundRed').play();
        incrementScore('red');
    } else {
        document.getElementById('soundBlue').play();
        incrementScore('blue');
    }
}

function incrementScore(color) {
    const scoreElement = document.getElementById(`score${color.charAt(0).toUpperCase() + color.slice(1)}`);
    scoreElement.textContent = parseInt(scoreElement.textContent) + 1;
}
