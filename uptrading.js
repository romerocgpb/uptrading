const functions = require('./functions');
const moment = require('moment');

/*var mes_atras = new Date("2025-10-01").getTime();
var agora = new Date("2025-10-02").getTime();

console.log(mes_atras, agora)

functions.getBtcPriceHistory('BTCUSDT', '1', mes_atras, agora).then(function(resp){
    console.log(resp);
})*/

var closes = [];

(async () => {
    // Parâmetros
    var symbol = "BTCUSDT";  // Par de trading
    var interval = "1";      // Intervalo de tempo (1 minuto)
    var startTime = new Date('2025-02-24 12:00:00').getTime();
    var endTime = new Date('2025-02-24 13:00:00').getTime();
    console.log(startTime, endTime);

    // Obtendo os dados de kline
    var klineData = await functions.getBtcPriceHistory(symbol, interval, startTime, endTime);
    
    // Exibindo os dados
    if (klineData) {
        console.log(`Dados de kline para ${symbol} (intervalo: ${interval} minuto(s)):`);
        klineData.forEach((candle) => {
            var timestamp = functions.convertTimestamp(candle[0]);  // Convertendo timestamp
            var openPrice = candle[1];  // Preço de abertura
            var closePrice = candle[4]; // Preço de fechamento
            var maxPrice = candle[2]; // Preço máximo
            var minPrice = candle[3]; // Preço mínimo
            closes.push(closePrice);
            // console.log(`Timestamp: ${timestamp} | Abertura: ${openPrice} | Fechamento: ${closePrice}| Máxima: ${maxPrice}| Mínima: ${minPrice}`);
        });

    }

    // Parâmetros
    var symbol = "BTCUSDT";  // Par de trading
    var interval = "1";      // Intervalo de tempo (1 minuto)
    var startTime = new Date('2025-02-24 13:00:00').getTime();
    var endTime = new Date('2025-02-24 14:00:00').getTime();
    console.log(startTime, endTime);

    // Obtendo os dados de kline
    var klineData = await functions.getBtcPriceHistory(symbol, interval, startTime, endTime);
    
    // Exibindo os dados
    if (klineData) {
        console.log(`Dados de kline para ${symbol} (intervalo: ${interval} minuto(s)):`);
        klineData.forEach((candle) => {
            var timestamp = functions.convertTimestamp(candle[0]);  // Convertendo timestamp
            var openPrice = candle[1];  // Preço de abertura
            var closePrice = candle[4]; // Preço de fechamento
            var maxPrice = candle[2]; // Preço máximo
            var minPrice = candle[3]; // Preço mínimo
            closes.push(closePrice);
            // console.log(`Timestamp: ${timestamp} | Abertura: ${openPrice} | Fechamento: ${closePrice}| Máxima: ${maxPrice}| Mínima: ${minPrice}`);
        });

    }
    // Parâmetros
    var symbol = "BTCUSDT";  // Par de trading
    var interval = "1";      // Intervalo de tempo (1 minuto)
    var startTime = new Date('2025-02-24 14:00:00').getTime();
    var endTime = new Date('2025-02-24 15:00:00').getTime();
    console.log(startTime, endTime);

    // Obtendo os dados de kline
    var klineData = await functions.getBtcPriceHistory(symbol, interval, startTime, endTime);
    
    // Exibindo os dados
    if (klineData) {
        console.log(`Dados de kline para ${symbol} (intervalo: ${interval} minuto(s)):`);
        klineData.forEach((candle) => {
            var timestamp = functions.convertTimestamp(candle[0]);  // Convertendo timestamp
            var openPrice = candle[1];  // Preço de abertura
            var closePrice = candle[4]; // Preço de fechamento
            var maxPrice = candle[2]; // Preço máximo
            var minPrice = candle[3]; // Preço mínimo
            closes.push(closePrice);
            // console.log(`Timestamp: ${timestamp} | Abertura: ${openPrice} | Fechamento: ${closePrice}| Máxima: ${maxPrice}| Mínima: ${minPrice}`);
        });

    }
    // Parâmetros
    var symbol = "BTCUSDT";  // Par de trading
    var interval = "1";      // Intervalo de tempo (1 minuto)
    var startTime = new Date('2025-02-24 15:00:00').getTime();
    var endTime = new Date('2025-02-24 16:00:00').getTime();
    console.log(startTime, endTime);

    // Obtendo os dados de kline
    var klineData = await functions.getBtcPriceHistory(symbol, interval, startTime, endTime);
    
    // Exibindo os dados
    if (klineData) {
        console.log(`Dados de kline para ${symbol} (intervalo: ${interval} minuto(s)):`);
        klineData.forEach((candle) => {
            var timestamp = functions.convertTimestamp(candle[0]);  // Convertendo timestamp
            var openPrice = candle[1];  // Preço de abertura
            var closePrice = candle[4]; // Preço de fechamento
            var maxPrice = candle[2]; // Preço máximo
            var minPrice = candle[3]; // Preço mínimo
            closes.push(closePrice);
            // console.log(`Timestamp: ${timestamp} | Abertura: ${openPrice} | Fechamento: ${closePrice}| Máxima: ${maxPrice}| Mínima: ${minPrice}`);
        });

    }
    // Parâmetros
    var symbol = "BTCUSDT";  // Par de trading
    var interval = "1";      // Intervalo de tempo (1 minuto)
    var startTime = new Date('2025-02-24 16:00:00').getTime();
    var endTime = new Date('2025-02-24 17:00:00').getTime();
    console.log(startTime, endTime);

    // Obtendo os dados de kline
    var klineData = await functions.getBtcPriceHistory(symbol, interval, startTime, endTime);
    
    // Exibindo os dados
    if (klineData) {
        console.log(`Dados de kline para ${symbol} (intervalo: ${interval} minuto(s)):`);
        klineData.forEach((candle) => {
            var timestamp = functions.convertTimestamp(candle[0]);  // Convertendo timestamp
            var openPrice = candle[1];  // Preço de abertura
            var closePrice = candle[4]; // Preço de fechamento
            var maxPrice = candle[2]; // Preço máximo
            var minPrice = candle[3]; // Preço mínimo
            closes.push(closePrice);
            // console.log(`Timestamp: ${timestamp} | Abertura: ${openPrice} | Fechamento: ${closePrice}| Máxima: ${maxPrice}| Mínima: ${minPrice}`);
        });

    }
    // Parâmetros
    var symbol = "BTCUSDT";  // Par de trading
    var interval = "1";      // Intervalo de tempo (1 minuto)
    var startTime = new Date('2025-02-24 17:00:00').getTime();
    var endTime = new Date('2025-02-24 18:00:00').getTime();
    console.log(startTime, endTime);

    // Obtendo os dados de kline
    var klineData = await functions.getBtcPriceHistory(symbol, interval, startTime, endTime);
    
    // Exibindo os dados
    if (klineData) {
        console.log(`Dados de kline para ${symbol} (intervalo: ${interval} minuto(s)):`);
        klineData.forEach((candle) => {
            var timestamp = functions.convertTimestamp(candle[0]);  // Convertendo timestamp
            var openPrice = candle[1];  // Preço de abertura
            var closePrice = candle[4]; // Preço de fechamento
            var maxPrice = candle[2]; // Preço máximo
            var minPrice = candle[3]; // Preço mínimo
            closes.push(closePrice);
            // console.log(`Timestamp: ${timestamp} | Abertura: ${openPrice} | Fechamento: ${closePrice}| Máxima: ${maxPrice}| Mínima: ${minPrice}`);
        });

    }
    console.log('[');
    for(var closep of closes){
        console.log(closep+',');
    }
    console.log(']');
})();


