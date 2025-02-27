const WebSocket = require('ws');
const { analyzeCandle } = require('./candleAnalysis');

const connectBybitWebSocket = (symbol = 'BTCUSDT', interval = 1) => {
    const ws = new WebSocket('wss://stream.bybit.com/v5/public/linear');

    ws.on('open', () => {
        console.log('Conectado ao WebSocket da Bybit');
        // Subscreve ao canal de candles de 1 minuto
        ws.send(JSON.stringify({
            op: 'subscribe',
            args: [`kline.${interval}.${symbol}`]
        }));
    });

    ws.on('message', (data) => {
        const message = JSON.parse(data);
        // console.log('Mensagem recebida:', JSON.stringify(message, null, 2)); // Log detalhado
    
        if (message.topic && message.topic.includes('kline')) {
            const candle = message.data;
            // Verifica se o candle está fechado
            if (candle[0].confirm) {
                console.log('Candle fechado recebido:', candle);
                analyzeCandle(candle); // Passa o candle para análise
            } else {
                console.log('Candle ainda aberto, aguardando fechamento...');
            }
        }
    });

    ws.on('error', (err) => {
        console.error('Erro no WebSocket:', err);
    });

    ws.on('close', () => {
        console.log('Conexão WebSocket fechada.');
    });
};

module.exports = { connectBybitWebSocket };