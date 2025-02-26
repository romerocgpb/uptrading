const WebSocket = require('ws');

// Configurações
const SYMBOL = 'BTCUSDT'; // Símbolo do par de negociação
const INTERVAL = '1'; // Intervalo de tempo em minutos
const WS_URL = 'wss://stream.bybit.com/v5/public/linear'; // URL do WebSocket

// Conecta ao WebSocket
const ws = new WebSocket(WS_URL);

ws.on('open', () => {
    console.log('Conectado ao WebSocket da Bybit');

    // Inscreve-se no stream de candles de 1 minuto
    const subscribeMessage = {
        op: 'subscribe',
        args: [`kline.${INTERVAL}.${SYMBOL}`]
    };
    ws.send(JSON.stringify(subscribeMessage));
});

ws.on('message', (data) => {
    const message = JSON.parse(data);

    // Verifica se a mensagem é do tópico de candles
    if (message.topic && message.topic.startsWith(`kline.${INTERVAL}.${SYMBOL}`)) {
        const candle = message.data[0];
        console.log('Candle de 1 minuto recebido:', {
            timestamp: new Date(candle.timestamp).toLocaleString(),
            open: candle.open,
            high: candle.high,
            low: candle.low,
            close: candle.close,
            volume: candle.volume
        });
    }
});

ws.on('error', (error) => {
    console.error('Erro no WebSocket:', error);
});

ws.on('close', () => {
    console.log('Conexão WebSocket fechada');
});