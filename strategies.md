## Stratégiák

### Áron stratégia
Indikátorok
- 50 napos mozgó átlag
- 200 napos mozgó átlag
- ha a kettő keresztezi egymást, akkor trendváltozás van
- 50 napos Fibinacci
- 30/70 RSI - relative strength 
- exponenciális mozgó átlag, a jelen pillanatot sokkal jobban mutatja
- MA/EMA cross

Miért ilyen fontos az alacsony ROI?
- Nem fontos, lehet magas is, nagyobb nyereség és kockázat

```json
{
  "max_open_trades": 10,
  "stake_currency": "USDT",
  "stake_amount": 100,
}
```

Backtesting
- 1 éves adaton a top 100 USDT spot párra
SampleStrategy - RSI alapú stratégia
Ha nagyra állítjuk a ROIt, tehát nagyobb hozam és kockázat, akkor kisebbre kell venni a RSI ablakot?
Hogy kiegyenlítsük azt, amit behoz kockázatot a magasabbra állított ROI, a szűkebb RSI ablakkal biztosítjuk. 
Pl nem 30/70 hanem 40/60.
Hyperopt-al megállapítani az optimális RSI ablakot, és ezt több ROI beállításra tesztelni.

A top 100 trading pár az dinamikusan változik a backtest alatt (és élőben is). A total volume alapján van rangsorolva az adott időpontban.

### Domi stratégia
ATH (All time High) után ne vásároljon - Stohastic Average Nagy ablakkal  
Ha gyorsan nő felfele, és áll egy helyben az ár egy ideig akkor eladja  
Stohastic Average Indicator - Mozgó Átlag  
Ha derivált (meredekség) az közel nulla, akkor ROI 1-2%  
Alaból a nagy változásoknál pedig ROI 10%  

```python
parameters = {
  stohastic: {
    short: '15m',
    long: '3d',   # all time high indicator window
  },
  max_roi: 0.1,  # 10% 
  min_roi: 0.01, # 1% 
}
