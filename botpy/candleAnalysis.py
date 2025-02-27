# candleAnalysis.py
import talib
import numpy as np
from simulator import simulate_trade  # Importa a função de simulação

class CandleAnalysis:
    def __init__(self):
        self.candles_history = []
        self.MAX_CANDLES = 50

        # Lista de todos os padrões de candles
        self.patterns = [
            {'name': 'Two Crows', 'pattern': talib.CDL2CROWS, 'signal': 'bearish'},
            {'name': 'Three Black Crows', 'pattern': talib.CDL3BLACKCROWS, 'signal': 'bearish'},
            {'name': 'Three Inside Up/Down', 'pattern': talib.CDL3INSIDE, 'signal': 'bullish'},
            {'name': 'Three-Line Strike', 'pattern': talib.CDL3LINESTRIKE, 'signal': 'bullish'},
            {'name': 'Three Outside Up/Down', 'pattern': talib.CDL3OUTSIDE, 'signal': 'bullish'},
            {'name': 'Three Stars in the South', 'pattern': talib.CDL3STARSINSOUTH, 'signal': 'bullish'},
            {'name': 'Three White Soldiers', 'pattern': talib.CDL3WHITESOLDIERS, 'signal': 'bullish'},
            {'name': 'Abandoned Baby', 'pattern': talib.CDLABANDONEDBABY, 'signal': 'bullish'},
            {'name': 'Advance Block', 'pattern': talib.CDLADVANCEBLOCK, 'signal': 'bearish'},
            {'name': 'Belt-Hold', 'pattern': talib.CDLBELTHOLD, 'signal': 'bullish'},
            {'name': 'Breakaway', 'pattern': talib.CDLBREAKAWAY, 'signal': 'bullish'},
            {'name': 'Closing Marubozu', 'pattern': talib.CDLCLOSINGMARUBOZU, 'signal': 'bullish'},
            {'name': 'Concealing Baby Swallow', 'pattern': talib.CDLCONCEALBABYSWALL, 'signal': 'bearish'},
            {'name': 'Counterattack', 'pattern': talib.CDLCOUNTERATTACK, 'signal': 'bullish'},
            {'name': 'Dark Cloud Cover', 'pattern': talib.CDLDARKCLOUDCOVER, 'signal': 'bearish'},
            {'name': 'Doji', 'pattern': talib.CDLDOJI, 'signal': 'neutral'},
            {'name': 'Doji Star', 'pattern': talib.CDLDOJISTAR, 'signal': 'neutral'},
            {'name': 'Dragonfly Doji', 'pattern': talib.CDLDRAGONFLYDOJI, 'signal': 'bullish'},
            {'name': 'Engulfing Pattern', 'pattern': talib.CDLENGULFING, 'signal': 'bullish'},
            {'name': 'Evening Doji Star', 'pattern': talib.CDLEVENINGDOJISTAR, 'signal': 'bearish'},
            {'name': 'Evening Star', 'pattern': talib.CDLEVENINGSTAR, 'signal': 'bearish'},
            {'name': 'Up/Down-gap side-by-side white lines', 'pattern': talib.CDLGAPSIDESIDEWHITE, 'signal': 'bullish'},
            {'name': 'Gravestone Doji', 'pattern': talib.CDLGRAVESTONEDOJI, 'signal': 'bearish'},
            {'name': 'Hammer', 'pattern': talib.CDLHAMMER, 'signal': 'bullish'},
            {'name': 'Hanging Man', 'pattern': talib.CDLHANGINGMAN, 'signal': 'bearish'},
            {'name': 'Harami', 'pattern': talib.CDLHARAMI, 'signal': 'bullish'},
            {'name': 'Harami Cross', 'pattern': talib.CDLHARAMICROSS, 'signal': 'bullish'},
            {'name': 'High-Wave', 'pattern': talib.CDLHIGHWAVE, 'signal': 'neutral'},
            {'name': 'Hikkake', 'pattern': talib.CDLHIKKAKE, 'signal': 'bullish'},
            {'name': 'Modified Hikkake', 'pattern': talib.CDLHIKKAKEMOD, 'signal': 'bullish'},
            {'name': 'Homing Pigeon', 'pattern': talib.CDLHOMINGPIGEON, 'signal': 'bullish'},
            {'name': 'Identical Three Crows', 'pattern': talib.CDLIDENTICAL3CROWS, 'signal': 'bearish'},
            {'name': 'In-Neck', 'pattern': talib.CDLINNECK, 'signal': 'bearish'},
            {'name': 'Inverted Hammer', 'pattern': talib.CDLINVERTEDHAMMER, 'signal': 'bullish'},
            {'name': 'Kicking', 'pattern': talib.CDLKICKING, 'signal': 'bullish'},
            {'name': 'Kicking by Length', 'pattern': talib.CDLKICKINGBYLENGTH, 'signal': 'bullish'},
            {'name': 'Ladder Bottom', 'pattern': talib.CDLLADDERBOTTOM, 'signal': 'bullish'},
            {'name': 'Long-Legged Doji', 'pattern': talib.CDLLONGLEGGEDDOJI, 'signal': 'neutral'},
            {'name': 'Long Line Candle', 'pattern': talib.CDLLONGLINE, 'signal': 'bullish'},
            {'name': 'Marubozu', 'pattern': talib.CDLMARUBOZU, 'signal': 'bullish'},
            {'name': 'Matching Low', 'pattern': talib.CDLMATCHINGLOW, 'signal': 'bullish'},
            {'name': 'Mat Hold', 'pattern': talib.CDLMATHOLD, 'signal': 'bullish'},
            {'name': 'Morning Doji Star', 'pattern': talib.CDLMORNINGDOJISTAR, 'signal': 'bullish'},
            {'name': 'Morning Star', 'pattern': talib.CDLMORNINGSTAR, 'signal': 'bullish'},
            {'name': 'On-Neck', 'pattern': talib.CDLONNECK, 'signal': 'bearish'},
            {'name': 'Piercing Pattern', 'pattern': talib.CDLPIERCING, 'signal': 'bullish'},
            {'name': 'Rickshaw Man', 'pattern': talib.CDLRICKSHAWMAN, 'signal': 'neutral'},
            {'name': 'Rising/Falling Three Methods', 'pattern': talib.CDLRISEFALL3METHODS, 'signal': 'bullish'},
            {'name': 'Separating Lines', 'pattern': talib.CDLSEPARATINGLINES, 'signal': 'bullish'},
            {'name': 'Shooting Star', 'pattern': talib.CDLSHOOTINGSTAR, 'signal': 'bearish'},
            {'name': 'Short Line Candle', 'pattern': talib.CDLSHORTLINE, 'signal': 'neutral'},
            {'name': 'Spinning Top', 'pattern': talib.CDLSPINNINGTOP, 'signal': 'neutral'},
            {'name': 'Stalled Pattern', 'pattern': talib.CDLSTALLEDPATTERN, 'signal': 'bearish'},
            {'name': 'Stick Sandwich', 'pattern': talib.CDLSTICKSANDWICH, 'signal': 'bullish'},
            {'name': 'Takuri', 'pattern': talib.CDLTAKURI, 'signal': 'bullish'},
            {'name': 'Tasuki Gap', 'pattern': talib.CDLTASUKIGAP, 'signal': 'bullish'},
            {'name': 'Thrusting', 'pattern': talib.CDLTHRUSTING, 'signal': 'bearish'},
            {'name': 'Tristar', 'pattern': talib.CDLTRISTAR, 'signal': 'neutral'},
            {'name': 'Unique 3 River', 'pattern': talib.CDLUNIQUE3RIVER, 'signal': 'bullish'},
            {'name': 'Upside Gap Two Crows', 'pattern': talib.CDLUPSIDEGAP2CROWS, 'signal': 'bearish'},
            {'name': 'Upside/Downside Gap Three Methods', 'pattern': talib.CDLXSIDEGAP3METHODS, 'signal': 'bullish'}
        ]

    def identify_candle_pattern(self, opens, highs, lows, closes):
        # Converta as listas para arrays do numpy
        opens = np.array(opens)
        highs = np.array(highs)
        lows = np.array(lows)
        closes = np.array(closes)

        for pattern in self.patterns:
            result = pattern['pattern'](opens, highs, lows, closes)
            if result[-1] != 0:
                return pattern  # Retorna o padrão identificado
        return None  # Nenhum padrão identificado

    def analyze_candle(self, candle_data):
        candle = {
            'timestamp': candle_data['start'],
            'open': float(candle_data['open']),
            'high': float(candle_data['high']),
            'low': float(candle_data['low']),
            'close': float(candle_data['close']),
            'volume': float(candle_data['volume'])
        }

        self.candles_history.append(candle)
        if len(self.candles_history) > self.MAX_CANDLES:
            self.candles_history.pop(0)

        # Dados para análise
        closes = [c['close'] for c in self.candles_history]
        opens = [c['open'] for c in self.candles_history]
        highs = [c['high'] for c in self.candles_history]
        lows = [c['low'] for c in self.candles_history]

        # Identifica qualquer padrão de candle
        pattern = self.identify_candle_pattern(opens, highs, lows, closes)

        if pattern:
            print(f'Padrão identificado: {pattern["name"]} ({pattern["signal"]})')
            if pattern['signal'] == 'bullish':
                print('📈 Padrão de alta identificado! Simulando compra...')
                simulate_trade('buy', candle['close'])  # Simula uma compra
            elif pattern['signal'] == 'bearish':
                print('📉 Padrão de baixa identificado! Simulando venda...')
                simulate_trade('sell', candle['close'])  # Simula uma venda
        else:
            print('Nenhum padrão de alta ou baixa identificado.')
        print('')