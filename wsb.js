const WebSocket = require('ws');
const { bullish, bearish, bullishengulfing, bearishengulfing, hammer, invertedhammer } = require('technicalindicators');

// Configurações
const SYMBOL = 'BTCUSDT'; // Símbolo do par de negociação
const WS_URL = 'wss://stream.bybit.com/v5/public/linear'; // URL do WebSocket

// Variáveis para agregação de candles
let currentCandle = null;
const candleInterval = 60 * 1000; // 1 minuto em milissegundos
let candles = []; // Armazena os candles históricos

// Variáveis de simulação
let position = null; // null, 'buy', ou 'sell'
let balance = 1000; // Saldo inicial em USDT
let assetAmount = 0; // Quantidade do ativo (BTC)
let orderExecuted = false; // Indica se uma ordem foi executada no último minuto

// Conecta ao WebSocket
const ws = new WebSocket(WS_URL);

ws.on('open', () => {
    console.log('Conectado ao WebSocket da Bybit');

    // Inscreve-se no stream de trades
    const subscribeMessage = {
        op: 'subscribe',
        args: [`trade.${SYMBOL}`]
    };
    ws.send(JSON.stringify(subscribeMessage));

    // Configura o intervalo para verificar ordens a cada minuto
    setInterval(() => {
        if (!orderExecuted) {
            const now = new Date();
            const timeString = `${now.getHours()}:${now.getMinutes()}`;
            console.log(`[${timeString}] Nenhuma ordem executada.`);
        }
        orderExecuted = false; // Reseta a flag para o próximo minuto
    }, candleInterval);
});

ws.on('message', (data) => {
    const message = JSON.parse(data);

    // Verifica se a mensagem é do tópico de trades
    if (message.topic && message.topic.startsWith(`trade.${SYMBOL}`)) {
        const trade = message.data[0];
        const price = parseFloat(trade.price);
        const timestamp = trade.timestamp;

        // Inicia um novo candle se necessário
        if (!currentCandle || timestamp - currentCandle.timestamp >= candleInterval) {
            if (currentCandle) {
                // Fecha o candle atual e adiciona ao histórico
                candles.push(currentCandle);

                // Verifica padrões de candles
                const patterns = detectCandlePatterns(candles);
                if (patterns.length > 0) {
                    patterns.forEach(pattern => {
                        console.log(`[PADRÃO] ${pattern} identificado. Preço: ${currentCandle.close}`);
                        executeStrategy(pattern, currentCandle.close);
                    });
                }

                // Mantém apenas os últimos 20 candles
                if (candles.length > 20) {
                    candles.shift();
                }
            }

            // Inicia um novo candle
            currentCandle = {
                timestamp: Math.floor(timestamp / candleInterval) * candleInterval,
                open: price,
                high: price,
                low: price,
                close: price,
                volume: 0
            };
        }

        // Atualiza o candle atual
        currentCandle.high = Math.max(currentCandle.high, price);
        currentCandle.low = Math.min(currentCandle.low, price);
        currentCandle.close = price;
        currentCandle.volume += parseFloat(trade.size);
    }
});

ws.on('error', (error) => {
    console.error('Erro no WebSocket:', error);
});

ws.on('close', () => {
    console.log('Conexão WebSocket fechada');
});

// Função para detectar padrões de candles
function detectCandlePatterns(candles) {
    if (candles.length < 2) return [];

    const previousCandle = candles[candles.length - 2];
    const currentCandle = candles[candles.length - 1];

    const patterns = [];

    // Bullish
    if (bullish(currentCandle)) {
        patterns.push('Bullish');
    }

    // Bearish
    if (bearish(currentCandle)) {
        patterns.push('Bearish');
    }

    // Bullish Engulfing
    if (bullishengulfing({
        open: [previousCandle.open, currentCandle.open],
        close: [previousCandle.close, currentCandle.close],
        high: [previousCandle.high, currentCandle.high],
        low: [previousCandle.low, currentCandle.low]
    })) {
        patterns.push('Bullish Engulfing');
    }

    // Bearish Engulfing
    if (bearishengulfing({
        open: [previousCandle.open, currentCandle.open],
        close: [previousCandle.close, currentCandle.close],
        high: [previousCandle.high, currentCandle.high],
        low: [previousCandle.low, currentCandle.low]
    })) {
        patterns.push('Bearish Engulfing');
    }

    // Hammer
    if (hammer(currentCandle)) {
        patterns.push('Hammer');
    }

    // Inverted Hammer
    if (invertedhammer(currentCandle)) {
        patterns.push('Inverted Hammer');
    }

    return patterns;
}

// Função para executar a estratégia de trading
function executeStrategy(pattern, price) {
    const quantity = 0.001; // Quantidade fixa para comprar/vender

    if (pattern.includes('Bullish') && position !== 'buy') {
        // Compra
        if (position === 'sell') {
            closePosition(price); // Fecha posição de venda antes de comprar
        }
        openPosition('buy', price, quantity);
        orderExecuted = true; // Marca que uma ordem foi executada
    } else if (pattern.includes('Bearish') && position !== 'sell') {
        // Venda
        if (position === 'buy') {
            closePosition(price); // Fecha posição de compra antes de vender
        }
        openPosition('sell', price, quantity);
        orderExecuted = true; // Marca que uma ordem foi executada
    }
}

// Função para abrir uma posição
function openPosition(side, price, quantity) {
    const cost = price * quantity;

    if (side === 'buy' && balance >= cost) {
        balance -= cost;
        assetAmount += quantity;
        position = 'buy';
        console.log(`[COMPRA] ${quantity} BTC a ${price}. Saldo: ${balance.toFixed(2)} USDT`);
    } else if (side === 'sell' && assetAmount >= quantity) {
        balance += price * quantity;
        assetAmount -= quantity;
        position = 'sell';
        console.log(`[VENDA] ${quantity} BTC a ${price}. Saldo: ${balance.toFixed(2)} USDT`);
    }
}

// Função para fechar uma posição
function closePosition(price) {
    if (position === 'buy') {
        balance += price * assetAmount;
        console.log(`[FECHAMENTO] Venda de ${assetAmount} BTC a ${price}. Saldo: ${balance.toFixed(2)} USDT`);
        assetAmount = 0;
    } else if (position === 'sell') {
        balance -= price * assetAmount;
        console.log(`[FECHAMENTO] Compra de ${assetAmount} BTC a ${price}. Saldo: ${balance.toFixed(2)} USDT`);
        assetAmount = 0;
    }
    position = null;
}