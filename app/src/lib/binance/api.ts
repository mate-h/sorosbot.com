import Binance from 'binance-api-node'

export const client = Binance();

export function getCandles() {
  return fetch(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=5m`).then(r => r.json());
}