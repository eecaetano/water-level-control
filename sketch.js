let waterLevel = 20000; // Nível inicial da água em ml
const maxWaterLevel = 20000; // Nível máximo da água em ml
const minWaterLevel = 49; // Nível mínimo da água em ml
let intervalId;
let isPaused = false;

function setup() {
    noCanvas();
    setTimeout(() => {
        waterLevel -= 1; // Perda inicial de 1ml após 15 segundos
        updateWaterDisplay();
        intervalId = setInterval(updateWaterLevel, 35000); // Intervalo de 35 segundos
    }, 15000); // Atraso de 15 segundos
    setInterval(updateClock, 1000);

    document.getElementById('pause-button').addEventListener('click', togglePause);
    document.getElementById('reset-button').addEventListener('click', resetSystem);
    document.getElementById('print-button').addEventListener('click', imprimirResultados);
}

function updateWaterLevel() {
    if (!isPaused) {
        if (waterLevel > 10000) {
            waterLevel -= 200; // Perda de 200ml
        } else if (waterLevel > 5000) {
            waterLevel -= 200; // Perda de 200ml
            registrarAlerta('50% abaixo do volume inicial');
        } else if (waterLevel > 2500) {
            waterLevel -= 2500; // Perda de 2500ml
            registrarAlerta('ALERTA! Nível d\'água é -25%', 'yellow');
        } else if (waterLevel > 1000) {
            waterLevel -= 1500; // Perda de 1500ml
        } else if (waterLevel > 500) {
            waterLevel -= 500; // Perda de 500ml
        } else if (waterLevel > 49) {
            waterLevel -= 50; // Perda de 50ml
        } else {
            waterLevel = minWaterLevel;
            registrarAlerta('Nível de água baixo!');
            clearInterval(intervalId);
        }

        updateWaterDisplay();
        logWaterLevel(waterLevel);
    }
}

function updateWaterDisplay() {
    document.getElementById('water').style.height = `${(waterLevel / maxWaterLevel) * 100}%`;
    document.getElementById('level-indicator').innerText = `Nível: ${waterLevel}ml`;
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
    const tableBody = document.getElementById('log-table').getElementsByTagName('tbody');
    const newRow = tableBody.insertRow();
    const timeCell = newRow.insertCell(0);
    const levelCell = newRow.insertCell(1);
    const alertCell = newRow.insertCell(2);
    timeCell.innerText = document.getElementById('clock').innerText;
    levelCell.innerText = `${currentVolume}ml`;
    alertCell.innerText = ''; // Inicialmente vazio, será preenchido se houver alerta
}

function registrarAlerta(alerta, color = 'black') {
    const tableBody = document.getElementById('log-table').getElementsByTagName('tbody');
    const lastRow = tableBody.rows[tableBody.rows.length - 1];
    if (lastRow) {
        const alertCell = lastRow.cells;
        alertCell.innerText = alerta;
        alertCell.style.color = color;
        alertCell.style.backgroundColor = 'yellow';
    }
}

function togglePause() {
    isPaused = !isPaused;
    document.getElementById('pause-button').innerText = isPaused ? 'Continuar' : 'Interromper';
}

function resetSystem() {
    clearInterval(intervalId);
    waterLevel = 20000;
    isPaused = false;
    document.getElementById('pause-button').innerText = 'Interromper';
    document.getElementById('log-table').getElementsByTagName('tbody').innerHTML = '';
    updateWaterDisplay();
    setTimeout(() => {
        waterLevel -= 1; // Perda inicial de 1ml após 15 segundos
        updateWaterDisplay();
        intervalId = setInterval(updateWaterLevel, 35000); // Intervalo de 35 segundos
    }, 15000); // Atraso de 15 segundos
}

function imprimirResultados() {
    window.print();
}
