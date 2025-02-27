const { startTelegramBot, bot } = require('./telegramBot');
const { connectBybitWebSocket } = require('./bybitWs');

startTelegramBot();
connectBybitWebSocket();