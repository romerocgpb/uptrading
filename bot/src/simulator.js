let balance = 10000.0; // Saldo inicial simulado
let position = null;
const trades = [];

const simulateTrade = (action, price) => {
    if (action === 'buy' && !position) {
        position = {
            entryPrice: price,
            size: balance * 0.1, // 10% do saldo
            tp: price * 1.02,    // Take-profit de 2%
            sl: price * 0.99      // Stop-loss de 1%
        };
        trades.push({ action: 'buy', price, time: new Date() });
    } else if (action === 'sell' && position) {
        const profit = (price - position.entryPrice) * position.size;
        balance += profit;
        position = null;
        trades.push({ action: 'sell', price, profit, time: new Date() });
    }
};

module.exports = { simulateTrade, trades, balance };