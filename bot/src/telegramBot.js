const TelegramBot = require('node-telegram-bot-api');
const { connectBybitWebSocket } = require('./bybitWs');
require('dotenv').config();

const bot = new TelegramBot('7885036146:AAEnKBlEzxgMRuFsyiwDOwr6VVMTYl-MfLs', { polling: true });
// Função para iniciar o bot do Telegram
const startTelegramBot = function() {
    bot.onText(/\/start/, function(msg) {
        const chatId = msg.chat.id;
        console.log('🤖 Bot iniciado! Monitorando BTC/USDT em 1m...')
        bot.sendMessage(chatId, '🤖 Bot iniciado! Monitorando BTC/USDT em 1m...');
        connectBybitWebSocket(); // Inicia WebSocket
    });

    bot.onText(/\/stop/, function(msg) {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, '🛑 Bot parado!');
        // Lógica para parar o WebSocket (se necessário)
    });

    bot.onText(/\/status/, function(msg) {
        const chatId = msg.chat.id;
        const { balance, trades } = require('./simulator');
        bot.sendMessage(chatId, `💰 Saldo: ${balance}\n📊 Trades realizados: ${trades.length}`);
    });
};

// Exporta a função para ser usada no index.js
exports.startTelegramBot = startTelegramBot;