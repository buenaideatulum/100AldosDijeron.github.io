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
            playPitidos(); // Reproducir los pitidos cortos
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

    // Ajusta las frecuencias
    if (color === 'red') {
        oscillator.frequency.setValueAtTime(3000, audioContext.currentTime); // Frecuencia grave
    } else {
        oscillator.frequency.setValueAtTime(2000, audioContext.currentTime); // Frecuencia muy aguda
    }

    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3); // Duración de 0.5 segundos
}

function playPitidos() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    for (let i = 0; i < 3; i++) { // 3 pitidos cortos
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(3000, audioContext.currentTime); // Frecuencia aguda
        oscillator.connect(audioContext.destination);
        oscillator.start(audioContext.currentTime + i * 0.09); // Pitidos cada 90ms
        oscillator.stop(audioContext.currentTime + (i * 0.1) + 0.015); // Cada pitido dura 100ms
    }
}

// Evento de animación interactiva fucsia
document.body.addEventListener('click', () => {
    document.body.classList.add('active');

    // Volver a la posición original después de 0.5 segundos
    setTimeout(() => {
        document.body.classList.remove('active');
    }, 500);
});
