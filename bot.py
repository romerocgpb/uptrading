from telegram.ext import Updater, InlineQueryHandler, CommandHandler
import requests

# URL da API Bybit para obter o ticker do BTCUSDT (mercado spot)
url = "https://api.bybit.com/v5/market/tickers?category=spot&symbol=BTCUSDT"

def return_btc_price():
    # Fazendo a requisição GET
    response = requests.get(url)

    # Verificando se a requisição foi bem-sucedida (código 200)
    if response.status_code == 200:
        # Parseando a resposta JSON
        data = response.json()

        # Verificando se a resposta contém os dados esperados
        if data.get("retCode") == 0 and data.get("result") and data["result"].get("list"):
            # Obtendo o preço do BTC (último preço negociado)
            btc_price = data["result"]["list"][0]["lastPrice"]
            return btc_price;
        else:
            return "Erro: Dados não encontrados na resposta da API."
    else:
        return f"Erro na requisição: Código {response.status_code}"



def update(bot, update):
    url = return_btc_price()
    chat_id = update.message.chat_id
    bot.send_photo(chat_id=chat_id, photo=url)

def main():
    updater = Updater('7849717512:AAFJ3QG712zvaMwNUSEs-QetcKRnN70b7wQ')
    dp = updater.dispatcher
    dp.add_handler(CommandHandler('update',update))
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()