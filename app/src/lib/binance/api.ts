import Binance from 'binance-api-node'
export let client: ReturnType<typeof Binance>;
if (typeof Binance === 'function')
  client = Binance();
