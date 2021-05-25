import type { BarData, SeriesMarker, Time } from "lightweight-charts";

const parameters = {
  max_open_trades: 10, // used for pairlists, not used for a single pair
  stake_amount: 100,   // USDT
  spread: 2,           // USDT
  timerange: -1,      // candles
  min_roi: 0.03,       // 3%
  stop_loss: -0.35     // -35%
}
type Positions = {
  long: 
    {
      buy_at: number, // buy_time < sell_time
      sell_at: number,
      buy_price: number,
      sell_price: number,
      roi: number,
    }[],
  short?: [
    {
      buy_at: number, // sell_time < buy_time
      sell_at: number
    }
  ]
}
export function optimalStrategy(data: BarData[]): Positions {
  // select long positions with maximal profit 
  // given trade parameters

  // lock pair while position is open

  // define problem space, generate random parameters
  const positions: Positions = {
    long: [

    ]
  }

  // define loss function
  function lossFunction() {
    return positions.long.reduce((a,c) => {
      
      // calculate profit (can be negative)
      const buyPrice = data[c.buy_at].low;
      const sellPrice = data[c.sell_at].high;
      const score = (sellPrice - buyPrice) * parameters.stake_amount;
      return a + score;
    }, 0);
  }

  // stohastic descent in problem space with loss function

  // brute force problem space
  let list: Positions = {long:[]};
  let min = 0;
  if (parameters.timerange > 0) {
    min = data.length - parameters.timerange
  }
  for(let i = min; i < data.length; i++) {
    for(let j = min; j < data.length; j++) {
      if (i < j) {
        const buy_price = data[i].low;
        const sell_price = data[j].high;
        // parameters.min_roi
        if (sell_price > buy_price) {
          const dy = sell_price - buy_price;
          const roi = (dy / buy_price);
          const dx = j - i;
          if (roi > parameters.min_roi) {
            list.long.push({
              buy_at: i, 
              sell_at: j,
              buy_price,
              sell_price,
              roi
            })
          }
        }
      }
    }
  }
  list.long.sort((a, b) => a.roi > b.roi ? -1 : 1);
  // list = list.filter(l => (l.sell_at - l.buy_at) > 3);
  function overlaps(p1, p2) {
    if (p1.buy_at >= p2.buy_at && p1.buy_at <= p2.sell_at) {
      return true;
    }
    if (p1.sell_at >= p2.buy_at && p1.sell_at <= p2.sell_at) {
      return true;
    }

    if (p2.buy_at >= p1.buy_at && p2.buy_at <= p1.sell_at) {
      return true;
    }
    if (p2.sell_at >= p1.buy_at && p2.sell_at <= p1.sell_at) {
      return true;
    }
    return false;
  }
  list.long.forEach((newPosition) => {
    let allOverlap = false;
    // if new poisition ovelaps any of the existing positions
    positions.long.forEach(p => {
      allOverlap = allOverlap || overlaps(p, newPosition)
    });
    if (!allOverlap) {
      // if there are positions that overlap the newPosition with a better ROI
      // allOverlap = false;
      // list.long.filter(p => overlaps(p, newPosition));

      positions.long.push(newPosition);
    }
  });
  return positions;
}

export function strategyMarkers(data: BarData[], positions: Positions): SeriesMarker<Time>[] {
  const markers: SeriesMarker<Time>[] = [];
  positions.long.forEach((p, i) => {
    const roi = Math.floor(p.roi*10000)/100;
    markers.push({
      time: data[p.buy_at].time,
      position: 'belowBar',
      color: '#2196F3',
      shape: 'arrowUp',
      text: (i+1) + '.'
    });
    markers.push({
      time: data[p.sell_at].time,
      position: 'aboveBar',
      color: '#e91e63',
      shape: 'arrowDown',
      text: (i+1) + '. ' + roi + '%'
    });
  })
  return markers;
}