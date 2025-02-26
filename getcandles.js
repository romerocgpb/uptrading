const axios = require('axios');

// Configurações
const symbol = 'BTCUSDT'; // Par de trading
const interval = '1m';    // Intervalo de 1 minuto
const limit = 1000;       // Limite de candles por requisição (máximo permitido pela Binance)
const day = '2025-02-20'; // Dia que você quer os dados (formato YYYY-MM-DD)

// Função para converter data em timestamp
function getTimestamp(date) {
    return new Date(date).getTime();
}

// Função para buscar candles
async function getCandles(startTime, endTime) {
    try {
        const response = await axios.get('https://api.binance.com/api/v3/klines', {
            params: {
                symbol: symbol,
                interval: interval,
                limit: limit,
                startTime: startTime,
                endTime: endTime,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar candles:', error.message);
        return [];
    }
}

// Função principal para buscar todos os candles do dia
async function getAllDayCandles() {
    const startTime = getTimestamp(`${day}T00:00:00Z`); // Início do dia (UTC)
    const endTime = getTimestamp(`${day}T23:59:59Z`);   // Fim do dia (UTC)
    let allCandles = [];

    let currentStartTime = startTime;

    while (currentStartTime < endTime) {
        const candles = await getCandles(currentStartTime, endTime);

        if (candles.length === 0) break; // Sai do loop se não houver mais dados

        // Adiciona os candles ao array
        allCandles = allCandles.concat(candles);

        // Atualiza o currentStartTime para o próximo intervalo
        const lastCandleTime = candles[candles.length - 1][0]; // Timestamp do último candle
        currentStartTime = lastCandleTime + 1; // Próximo candle após o último
    }

    return allCandles;
}

// Executa a função e exibe os candles
(async () => {
    const candles = await getAllDayCandles();
    console.log(`Total de candles obtidos: ${candles.length}`);
    console.log('[');
    for(var candle of candles){
        console.log({open:candle[1] , high:candle[2] , low:candle[3] ,close:candle[4]},',')
    }
    console.log(']');
})();