const axios = require('axios');

async function update_btc_price(){
    var resp = await axios.get('https://api.bybit.com/v5/market/tickers?category=spot&symbol=BTCUSDT')
    return resp.data.result.list[0].lastPrice;
}

// Função para obter dados de candlestick (kline) da Bybit
async function getBtcPriceHistory(symbol, interval, startTime, endTime) {
    // URL da API Bybit para obter dados de kline
    const url = "https://api.bybit.com/v5/market/kline";

    // Parâmetros da requisição
    const params = {
        category: "spot",  // Mercado à vista
        symbol: symbol,    // Par de trading (ex: BTCUSDT)
        interval: interval,  // Intervalo de tempo (ex: 1 para 1 minuto)
        start: startTime,  // Timestamp de início (em milissegundos)
        end: endTime,      // Timestamp de fim (em milissegundos)
    };

    try {
        // Fazendo a requisição GET com Axios
        const response = await axios.get(url, { params });

        // Verificando se a requisição foi bem-sucedida
        if (response.data.retCode === 0 && response.data.result && response.data.result.list) {
            // Retornando a lista de candles
            return response.data.result.list;
        } else {
            console.log("Erro: Dados não encontrados na resposta da API.");
            return response;
        }
    } catch (error) {
        console.error("Erro na requisição:", error.message);
        return response;
    }
}

// Função para converter timestamp em formato legível
function convertTimestamp(ts) {
    return new Date(parseInt(ts)).toISOString().replace("T", " ").replace("Z", "");
}

async function executeAsync(func){
    func();
}

exports.update_btc_price = update_btc_price;
exports.executeAsync = executeAsync;
exports.getBtcPriceHistory = getBtcPriceHistory;
exports.convertTimestamp = convertTimestamp;