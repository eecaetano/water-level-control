let waterLevel = 2000; // Initial water level in pixels
const maxWaterLevel = 2000; // Maximum water level in pixels
const minWaterLevel = 5; // Minimum water level in pixels
const waterLossSequence = [10, 5, 15, 20, 25, 10, 5, 10, 15, 5]; // Water loss sequence in pixels
const maxWaterVolume = 2000; // Maximum water volume in liters
let elapsedTime = 0;
let intervalId;
let sequenceIndex = 0;
let isPaused = false;

function setup() {
    console.log("Setup iniciado");
    noCanvas();
    setTimeout(() => {
        waterLevel -= 200; // Initial 200ml loss after 30 seconds
        updateWaterDisplay();
        intervalId = setInterval(updateWaterLevel, 90000); // 90 seconds interval
    }, 30000); // 30 seconds delay
    setInterval(updateClock, 1000);

    document.getElementById('pause-button').addEventListener('click', togglePause);
    document.getElementById('reset-button').addEventListener('click', resetSystem);
    document.getElementById('print-button').addEventListener('click', imprimirResultados);
}

function updateWaterLevel() {
    if (!isPaused) {
        let alerta = "";

        if (sequenceIndex < waterLossSequence.length) {
            waterLevel -= waterLossSequence[sequenceIndex];
            sequenceIndex++;
        } else {
            waterLevel -= 5; // Default loss if sequence is exhausted
        }

        if (waterLevel <= minWaterLevel) {
            waterLevel = minWaterLevel;
            alerta = "Nível de água crítico";
            clearInterval(intervalId);
        } else if (waterLevel <= maxWaterLevel / 2) {
            alerta = "Nível de água = ou < 50%";
        }

        updateWaterDisplay();

        const currentVolume = (waterLevel / maxWaterLevel) * maxWaterVolume;
        logWaterLevel(currentVolume, alerta);
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

function logWaterLevel(currentVolume, alerta) {
    console.log("Registrando nível de água:", currentVolume, alerta);
    const tableBody = document.getElementById('log-table').getElementsByTagName('tbody')[0];
    const newRow = tableBody.insertRow();
    const timeCell = newRow.insertCell(0);
    const levelCell = newRow.insertCell(1);
    const alertCell = newRow.insertCell(2);
    timeCell.innerText = document.getElementById('clock').innerText;
    levelCell.innerText = `${currentVolume.toFixed(2)}L`;
    alertCell.innerText = alerta || "Nenhum alerta";
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
    document.getElementById('alert').style.display = 'none';
    document.getElementById('attention-alert').style.display = 'none';
    document.getElementById('log-table').getElementsByTagName('tbody')[0].innerHTML = '';
    updateWaterDisplay();
    setTimeout(() => {
        waterLevel -= 20; // Initial 200ml loss after 30 seconds
        updateWaterDisplay();
        intervalId = setInterval(updateWaterLevel, 90000); // 90 seconds interval
    }, 30000); // 30 seconds delay
}
// Função para imprimir os resultados na tela
function imprimirResultados() {
    const capacidadeReservatorio = 2000; // Capacidade do reservatório em litros
    const resultados = [
        { dataHora: "2024-10-12 10:00", alerta: "Nível de água crítico", volume: 1500 },
        { dataHora: "2024-10-12 11:00", alerta: "Nível de água crítico", volume: 1400 },
        { dataHora: "2024-10-12 12:00", alerta: "Queda do nível de água", volume: 1300 },
    ];
    const numeroAlertas = resultados.length;
    const cidade = "São Paulo";
    const dataAtual = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

    console.log("\n\n");
    console.log("Caetano_AquaControl®".padStart(40));
    console.log(" Projeto experimental de Sistema de monitoramento de Nível D'água".padStart(50));
    console.log(`${cidade}, ${dataAtual}`.padStart(70));
    console.log("\nCONFIRA OS RESULTADOS\n".padStart(40));
    console.log(`Capacidade do RESEVATÓRIO: ${capacidadeReservatorio} L\n`);
    console.log("Data/Hora\t\t\tAlerta\t\t\tVolume de Água (L)");
    console.log("-".repeat(70));
    resultados.forEach(resultado => {
        console.log(`${resultado.dataHora}\t${resultado.alerta}\t${resultado.volume}L`);
    });
    console.log("\n\n");
    console.log("Obrigado por utilizar o AquaControl".padStart(70));
}

// Inicializar o sistema
setup();
