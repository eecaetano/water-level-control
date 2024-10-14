let waterLevel = 200; // Nível inicial da água em pixels
const maxWaterLevel = 200; // Nível máximo da água em pixels
const minWaterLevel = 15; // Nível mínimo da água em pixels
const waterLossSequence = [10, 25, 10, 25, 30, 20, 25, 10, 25, 15, 5]; // Sequência de perda de água em pixels
const maxWaterVolume = 2000; // Volume máximo de água em litros
let elapsedTime = 0;
let intervalId;
let sequenceIndex = 0;
let isPaused = false;

function setup() {
    noCanvas();
    setTimeout(() => {
        waterLevel -= 20; // Perda inicial de 200ml após 30 segundos
        updateWaterDisplay();
        intervalId = setInterval(updateWaterLevel, 90000); // Intervalo de 90 segundos
    }, 30000); // Atraso de 30 segundos
    setInterval(updateClock, 1000);

    document.getElementById('pause-button').addEventListener('click', togglePause);
    document.getElementById('reset-button').addEventListener('click', resetSystem);
    document.getElementById('print-button').addEventListener('click', imprimirResultados);
}

function updateWaterLevel() {
    if (!isPaused) {
        if (sequenceIndex < waterLossSequence.length) {
            waterLevel -= waterLossSequence[sequenceIndex];
            sequenceIndex++;
        } else {
            waterLevel -= 5; // Perda padrão se a sequência estiver esgotada
        }

        if (waterLevel <= minWaterLevel) {
            waterLevel = minWaterLevel;
            registrarAlerta('Nível de água baixo!');
            clearInterval(intervalId);
        }

        updateWaterDisplay();

        const currentVolume = (waterLevel / maxWaterLevel) * maxWaterVolume;
        if (currentVolume <= maxWaterVolume / 2) {
            registrarAlerta('Atenção! Nível próximo a 50%!');
        if (currentVolume <= maxWaterVolume / 3) {
            registrarAlerta('Atenção! Nível inferior a 50%!');
        }

        logWaterLevel(currentVolume);
    }
}

function updateWaterDisplay() {
    document.getElementById('water').style.height = `${waterLevel}px`;
    const currentVolume = (waterLevel / maxWaterLevel) * maxWaterVolume;
    document.getElementById('level-indicator').innerText = `Nível: ${currentVolume.toFixed(2)}L`;
}

function updateClock() {
    if (!isPaused) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        document.getElementById('clock').innerText = `Hora: ${hours}:${minutes}:${seconds}`;
    }
}

function logWaterLevel(currentVolume) {
    const tableBody = document.getElementById('log-table').getElementsByTagName('tbody')[0];
    const newRow = tableBody.insertRow();
    const timeCell = newRow.insertCell(0);
    const levelCell = newRow.insertCell(1);
    const alertCell = newRow.insertCell(2);
    timeCell.innerText = document.getElementById('clock').innerText;
    levelCell.innerText = `${currentVolume.toFixed(2)}L`;
    alertCell.innerText = ''; // Inicialmente vazio, será preenchido se houver alerta
}

function registrarAlerta(alerta) {
    const tableBody = document.getElementById('log-table').getElementsByTagName('tbody')[0];
    const lastRow = tableBody.rows[tableBody.rows.length - 1];
    if (lastRow) {
        const alertCell = lastRow.cells[2];
        alertCell.innerText = alerta;
    }
}

function togglePause() {
    isPaused = !isPaused;
    document.getElementById('pause-button').innerText = isPaused ? 'Continuar' : 'Interromper';
}

function resetSystem() {
    clearInterval(intervalId);
    waterLevel = 200;
    sequenceIndex = 0;
    isPaused = false;
    document.getElementById('pause-button').innerText = 'Interromper';
    document.getElementById('log-table').getElementsByTagName('tbody')[0].innerHTML = '';
    updateWaterDisplay();
    setTimeout(() => {
        waterLevel -= 20; // Perda inicial de 200ml após 30 segundos
        updateWaterDisplay();
        intervalId = setInterval(updateWaterLevel, 90000); // Intervalo de 90 segundos
    }, 30000); // Atraso de 30 segundos
}

function imprimirResultados() {
    window.print();
}
