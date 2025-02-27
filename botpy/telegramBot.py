# telegramBot.py
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes
from bybitWs import BybitWebSocket
from simulator import get_balance  # Importa a função para obter o saldo

class TelegramBot:
    def __init__(self, token):
        self.token = token
        self.bybit_ws = BybitWebSocket()

    async def start(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        chat_id = update.message.chat_id
        print('🤖 Bot iniciado! Monitorando BTC/USDT em 1m...')
        await context.bot.send_message(chat_id, '🤖 Bot iniciado! Monitorando BTC/USDT em 1m...')
        self.bybit_ws.connect_bybit_websocket()

    async def stop(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        chat_id = update.message.chat_id
        await context.bot.send_message(chat_id, '🛑 Bot parado!')
        # Lógica para parar o WebSocket (se necessário)

    async def status(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        chat_id = update.message.chat_id
        balance = get_balance()
        trades_info = "\n".join([f"{trade['time']} - {trade['action']} - Preço: {trade['price']} - BTC: {trade.get('amount_btc', 0):.8f} - USD: {trade.get('amount_usd', 0):.2f} - Lucro: {trade.get('profit', 0):.2f}" for trade in balance['trades']])
        await context.bot.send_message(
            chat_id,
            f'💰 Saldo:\n'
            f'BTC: {balance["btc_balance"]:.8f}\n'
            f'USD: {balance["usd_balance"]:.2f}\n'
            f'📊 Trades realizados: {len(balance["trades"])}\n'
            f'📝 Histórico de Trades:\n{trades_info}'
        )

    def run(self):
        # Cria a aplicação
        application = Application.builder().token(self.token).build()

        # Adiciona os handlers
        application.add_handler(CommandHandler("start", self.start))
        application.add_handler(CommandHandler("stop", self.stop))
        application.add_handler(CommandHandler("status", self.status))

        # Inicia o bot
        print("Bot está rodando...")
        application.run_polling()