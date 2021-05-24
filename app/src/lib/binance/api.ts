import Binance from 'binance-api-node'
export let client;
if (typeof Binance === 'function')
  client = Binance();
