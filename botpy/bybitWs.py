import threading
import websocket
import json
from candleAnalysis import CandleAnalysis

class BybitWebSocket:
    def __init__(self):
        self.candle_analysis = CandleAnalysis()

    def connect_bybit_websocket(self, symbol='BTCUSDT', interval=1):
        def run_websocket():
            ws = websocket.WebSocketApp(
                'wss://stream.bybit.com/v5/public/linear',
                on_open=self.on_open,
                on_message=self.on_message,
                on_error=self.on_error,
                on_close=self.on_close
            )
            ws.symbol = symbol
            ws.interval = interval
            ws.run_forever()

        # Executa o WebSocket em uma thread separada
        websocket_thread = threading.Thread(target=run_websocket)
        websocket_thread.daemon = True  # A thread será encerrada quando o programa principal terminar
        websocket_thread.start()

    def on_open(self, ws):
        print('Conectado ao WebSocket da Bybit')
        print('')
        ws.send(json.dumps({
            'op': 'subscribe',
            'args': [f'kline.{ws.interval}.{ws.symbol}']
        }))

    def on_message(self, ws, message):
        data = json.loads(message)
        if 'topic' in data and 'kline' in data['topic']:
            candle = data['data'][0]
            if candle['confirm']:
                print('Candle fechado recebido:', candle)
                self.candle_analysis.analyze_candle(candle)
            '''else:
                print('Candle ainda aberto, aguardando fechamento...')'''

    def on_error(self, ws, error):
        print('Erro no WebSocket:', error)

    def on_close(self, ws):
        print('Conexão WebSocket fechada.')