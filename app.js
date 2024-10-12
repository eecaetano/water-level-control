// Função para imprimir os resultados na tela
function imprimirResultados() {
    const capacidadeReservatorio = 2000; // Capacidade do reservatório em litros
    const resultados = [
        { dataHora: "2024-10-12 10:00", alerta: "Nível de água baixo", volume: 1500 },
        { dataHora: "2024-10-12 11:00", alerta: "Nível de água crítico", volume: 1400 },
        { dataHora: "2024-10-12 12:00", alerta: "Nível de água crítico", volume: 1300 },
    ];
    const numeroAlertas = resultados.length;
    const cidade = "São Paulo";
    const dataAtual = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

    console.log("\n\n");
    console.log("Caetano_AquaControl®".padStart(40));
    console.log("Sistema de monitoramento de vasão experimental".padStart(50));
    console.log("\nCONFIRA OS RESULTADOS\n".padStart(40));
    console.log(`Capacidade do RESEVATÓRIO: ${capacidadeReservatorio} L\n`);
    console.log("Data/Hora\t\t\tAlerta\t\t\tVolume de Água (L)");
    console.log("-".repeat(70));
    resultados.forEach(resultado => {
        console.log(`${resultado.dataHora}\t${resultado.alerta}\t${resultado.volume}L`);
    });
    console.log("\n\n");
    console.log("Obrigado por utilizar o AquaControl".padStart(70));
    console.log(`${cidade}, ${dataAtual}`.padStart(70));
}

// Chamar a função para executar
imprimirResultados();
