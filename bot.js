const TelegramBot = require('node-telegram-bot-api');
const functions = require('./functions');
const TOKEN = '7885036146:AAEnKBlEzxgMRuFsyiwDOwr6VVMTYl-MfLs';

const bot = new TelegramBot(TOKEN, { polling: true });



bot.on('message', async function(msg){
    if(msg.text=='/btc'){
        functions.executeAsync(async function() {
            var preco = await functions.update_btc_price();
            bot.sendMessage(msg.chat.id, `Preço do bitcoin em USD: ${preco}`);
        });
    }
});

console.log('Uptrading iniciado.');