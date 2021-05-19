## Strategies

### Domi strategy
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
```
