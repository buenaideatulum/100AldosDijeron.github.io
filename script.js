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
            playBellSound();  // Reproducir el sonido de campana
            firstPressed = null; // Resetear primer botón presionado
            isGameActive = false;
            document.getElementById('startButton').disabled = false;
        }
    }, 1000);
}

function buttonPressed(color) {
    if (firstPressed) return; // Solo un botón puede ser presionado primero
    firstPressed = color;

    if (color === 'red') {
        playSound('red'); // Reproducir sonido rojo
        incrementScore('red');
    } else {
        playSound('blue'); // Reproducir sonido azul
        incrementScore('blue');
    }
}

function incrementScore(color) {
    const scoreElement = document.getElementById(`score${color.charAt(0).toUpperCase() + color.slice(1)}`);
    scoreElement.textContent = parseInt(scoreElement.textContent) + 1;
}

function playSound(color) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    
    oscillator.type = 'sine'; // Tipo de onda
    oscillator.frequency = color === 'red' ? 200 : 1000; // Frecuencia para el sonido
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5); // Duración de 0.5 segundos
}

function playBellSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    
    oscillator.type = 'sine'; // Tipo de onda
    oscillator.frequency = 440; // Frecuencia de la campana
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5); // Duración de 0.5 segundos
}
