from telegramBot import TelegramBot
from bybitWs import BybitWebSocket

if __name__ == '__main__':
    token = '7885036146:AAEnKBlEzxgMRuFsyiwDOwr6VVMTYl-MfLs'
    bot = TelegramBot(token)
    bybit_ws = BybitWebSocket()

    # Inicia o WebSocket em uma thread separada
    bybit_ws.connect_bybit_websocket()

    # Inicia o bot do Telegram
    bot.run()