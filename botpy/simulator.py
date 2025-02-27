# simulator.py
from datetime import datetime

# Saldos iniciais
btc_balance = 0.0  # Saldo inicial de BTC
usd_balance = 100.0  # Saldo inicial de USD
position = None  # Posição atual (comprada ou vendida)
trades = []  # Histórico de trades

def simulate_trade(action, price):
    global btc_balance, usd_balance, position, trades

    if action == 'buy':
        if position:
            print("Já há uma posição aberta. Ignorando nova compra.")
            return  # Ignora a compra se já houver uma posição aberta

        # Calcula o tamanho da compra (10% do saldo em USD)
        amount_usd = usd_balance * 1
        amount_btc = amount_usd / price

        # Atualiza os saldos
        usd_balance -= amount_usd
        btc_balance += amount_btc

        # Registra a posição
        position = {
            'entry_price': price,
            'size': amount_btc,
            'tp': price * 1.02,  # Take-profit de 2%
            'sl': price * 0.99    # Stop-loss de 1%
        }

        # Adiciona o trade ao histórico
        trades.append({
            'action': 'buy',
            'price': price,
            'amount_btc': amount_btc,
            'amount_usd': amount_usd,
            'time': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        })
        print(f"Compra realizada: {amount_btc:.8f} BTC a ${price:.2f}")

    elif action == 'sell':
        if not position:
            print("Nenhuma posição aberta para vender. Ignorando venda.")
            return  # Ignora a venda se não houver uma posição aberta

        # Calcula o lucro/prejuízo
        profit = (price - position['entry_price']) * position['size']

        # Atualiza os saldos
        usd_balance += position['size'] * price
        btc_balance -= position['size']

        # Fecha a posição
        position = None

        # Adiciona o trade ao histórico
        trades.append({
            'action': 'sell',
            'price': price,
            'profit': profit,
            'time': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        })
        print(f"Venda realizada: Lucro/Prejuízo = ${profit:.2f}")

def get_balance():
    return {
        'btc_balance': btc_balance,
        'usd_balance': usd_balance,
        'position': position,
        'trades': trades
    }