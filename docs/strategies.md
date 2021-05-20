## Stratégiák

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

Úgy lehet visszaforgatni a pénzt, hogy ahogy nő az egyenleg, úgy dinamikusan emelkedik a max_open_trades és a stake_amount paraméter. Nem csak live, hanem a backtest alatt is.

## Jegyzetek

Érdemes utánanézni:
Volatilitást jelző indikátor - OBV (on balance volume)
- Ha emelkedik, akkor valószínű az ár is
- Ha az ár abbahagyta az emelkedést, de az indikátor emelkedik akkor az ár is feltehetőleg emelkedni fog
- Ha az ár emelkedik, és az indikátor oldalaz vagy csökken akkor az ár elérte a tetejét és ezután csak csökkenni fog
- Ha az ár csökken de az indikátor oldalra megy vagy emelkedik akkor elértük a csökkenés alját

Az ár változásával kell összehasonlítani.
Ha sokan vesznek egyszerre alacson áron, tehát megnő a volume. A kereslet felhúzza az árat.

Ezt az indikátort lehetne jól kombinálni a Sztohasztikus RSI-vel. 

Hozzunk létre egy új indikátort, ami ML alapú. Ezt a modellt úgy tudjuk betanítani, hogy létrehozunk egy adatbázist buy és sell signálokból, egy adott időszakra, egy adott párra, adott piacon.

pl BTC/USDT egy hónapra visszamenőleg a Binance-en. 

Ha a RSI alapú signal az egyezik az ML eredményével, és ez azt jelenti hogy erős a signal. Az erős signal-ok esetében nem feltétlen kell a guard. 
