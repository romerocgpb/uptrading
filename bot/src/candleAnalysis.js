const talib = require('talib.js');


async function start() {
    // Inicialize a biblioteca talib.js
    await talib.init();

    const candlesHistory = [];
    const MAX_CANDLES = 50;

    // Lista de todos os padrões de candles
    const patterns = [
        { name: 'Two Crows', pattern: talib.CDL2CROWS },
        { name: 'Three Black Crows', pattern: talib.CDL3BLACKCROWS },
        { name: 'Three Inside Up/Down', pattern: talib.CDL3INSIDE },
        { name: 'Three-Line Strike', pattern: talib.CDL3LINESTRIKE },
        { name: 'Three Outside Up/Down', pattern: talib.CDL3OUTSIDE },
        { name: 'Three Stars in the South', pattern: talib.CDL3STARSINSOUTH },
        { name: 'Three White Soldiers', pattern: talib.CDL3WHITESOLDIERS },
        { name: 'Abandoned Baby', pattern: talib.CDLABANDONEDBABY },
        { name: 'Advance Block', pattern: talib.CDLADVANCEBLOCK },
        { name: 'Belt-Hold', pattern: talib.CDLBELTHOLD },
        { name: 'Breakaway', pattern: talib.CDLBREAKAWAY },
        { name: 'Closing Marubozu', pattern: talib.CDLCLOSINGMARUBOZU },
        { name: 'Concealing Baby Swallow', pattern: talib.CDLCONCEALBABYSWALL },
        { name: 'Counterattack', pattern: talib.CDLCOUNTERATTACK },
        { name: 'Dark Cloud Cover', pattern: talib.CDLDARKCLOUDCOVER },
        { name: 'Doji', pattern: talib.CDLDOJI },
        { name: 'Doji Star', pattern: talib.CDLDOJISTAR },
        { name: 'Dragonfly Doji', pattern: talib.CDLDRAGONFLYDOJI },
        { name: 'Engulfing Pattern', pattern: talib.CDLENGULFING },
        { name: 'Evening Doji Star', pattern: talib.CDLEVENINGDOJISTAR },
        { name: 'Evening Star', pattern: talib.CDLEVENINGSTAR },
        { name: 'Up/Down-gap side-by-side white lines', pattern: talib.CDLGAPSIDESIDEWHITE },
        { name: 'Gravestone Doji', pattern: talib.CDLGRAVESTONEDOJI },
        { name: 'Hammer', pattern: talib.CDLHAMMER },
        { name: 'Hanging Man', pattern: talib.CDLHANGINGMAN },
        { name: 'Harami', pattern: talib.CDLHARAMI },
        { name: 'Harami Cross', pattern: talib.CDLHARAMICROSS },
        { name: 'High-Wave', pattern: talib.CDLHIGHWAVE },
        { name: 'Hikkake', pattern: talib.CDLHIKKAKE },
        { name: 'Modified Hikkake', pattern: talib.CDLHIKKAKEMOD },
        { name: 'Homing Pigeon', pattern: talib.CDLHOMINGPIGEON },
        { name: 'Identical Three Crows', pattern: talib.CDLIDENTICAL3CROWS },
        { name: 'In-Neck', pattern: talib.CDLINNECK },
        { name: 'Inverted Hammer', pattern: talib.CDLINVERTEDHAMMER },
        { name: 'Kicking', pattern: talib.CDLKICKING },
        { name: 'Kicking by Length', pattern: talib.CDLKICKINGBYLENGTH },
        { name: 'Ladder Bottom', pattern: talib.CDLLADDERBOTTOM },
        { name: 'Long-Legged Doji', pattern: talib.CDLLONGLEGGEDDOJI },
        { name: 'Long Line Candle', pattern: talib.CDLLONGLINE },
        { name: 'Marubozu', pattern: talib.CDLMARUBOZU },
        { name: 'Matching Low', pattern: talib.CDLMATCHINGLOW },
        { name: 'Mat Hold', pattern: talib.CDLMATHOLD },
        { name: 'Morning Doji Star', pattern: talib.CDLMORNINGDOJISTAR },
        { name: 'Morning Star', pattern: talib.CDLMORNINGSTAR },
        { name: 'On-Neck', pattern: talib.CDLONNECK },
        { name: 'Piercing Pattern', pattern: talib.CDLPIERCING },
        { name: 'Rickshaw Man', pattern: talib.CDLRICKSHAWMAN },
        { name: 'Rising/Falling Three Methods', pattern: talib.CDLRISEFALL3METHODS },
        { name: 'Separating Lines', pattern: talib.CDLSEPARATINGLINES },
        { name: 'Shooting Star', pattern: talib.CDLSHOOTINGSTAR },
        { name: 'Short Line Candle', pattern: talib.CDLSHORTLINE },
        { name: 'Spinning Top', pattern: talib.CDLSPINNINGTOP },
        { name: 'Stalled Pattern', pattern: talib.CDLSTALLEDPATTERN },
        { name: 'Stick Sandwich', pattern: talib.CDLSTICKSANDWICH },
        { name: 'Takuri', pattern: talib.CDLTAKURI },
        { name: 'Tasuki Gap', pattern: talib.CDLTASUKIGAP },
        { name: 'Thrusting', pattern: talib.CDLTHRUSTING },
        { name: 'Tristar', pattern: talib.CDLTRISTAR },
        { name: 'Unique 3 River', pattern: talib.CDLUNIQUE3RIVER },
        { name: 'Upside Gap Two Crows', pattern: talib.CDLUPSIDEGAP2CROWS },
        { name: 'Upside/Downside Gap Three Methods', pattern: talib.CDLXSIDEGAP3METHODS }
    ];

    // Função para identificar qualquer padrão de candle
    const identifyCandlePattern = (opens, highs, lows, closes) => {
        for (const pattern of patterns) {
            const result = pattern.pattern({
                name: pattern.pattern,
                startIdx: 0,
                endIdx: closes.length - 1,
                open: opens,
                high: highs,
                low: lows,
                close: closes,
                optInTimePeriod: 1 // Período de tempo (1 para candles de 1 minuto)
            });

            if (result.result.outInteger[result.result.outInteger.length - 1] !== 0) {
                return pattern.name; // Padrão identificado
            }
        }

        return null; // Nenhum padrão identificado
    };

    const analyzeCandle = (candleData) => {
        const candle = {
            timestamp: candleData.start,
            open: parseFloat(candleData.open),
            high: parseFloat(candleData.high),
            low: parseFloat(candleData.low),
            close: parseFloat(candleData.close),
            volume: parseFloat(candleData.volume)
        };

        candlesHistory.push(candle);
        if (candlesHistory.length > MAX_CANDLES) candlesHistory.shift();

        // Dados para análise
        const closes = candlesHistory.map(c => c.close);
        const opens = candlesHistory.map(c => c.open);
        const highs = candlesHistory.map(c => c.high);
        const lows = candlesHistory.map(c => c.low);

        // Identifica qualquer padrão de candle
        const pattern = identifyCandlePattern(opens, highs, lows, closes);

        if (pattern) {
            console.log(`Padrão identificado: ${pattern}`);
            if (pattern.includes('Bullish') || pattern.includes('Up')) {
                console.log('📈 Padrão de alta identificado!');
            } else if (pattern.includes('Bearish') || pattern.includes('Down')) {
                console.log('📉 Padrão de baixa identificado!');
            }
        } else {
            console.log('Nenhum padrão de alta ou baixa identificado.');
        }
    };

    module.exports = { analyzeCandle };
}


start();