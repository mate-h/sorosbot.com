# sorosbot.com
MAY 2021

# Trading Bot Notes
## HFT Bots

High Frequency Trading bots exploit differences in asset value between markets, and within a market, as well as trade on a short term basis. 

## Design constraints

The bot should be easy to interface with, e.g. though a webpage or messaging app such as telegram. 
The list of supported markets should be the following:
- Bitmart — https://www.bitmart.com/ 
- Dex — https://dex.guru/ 
- Pancakeswap — https://pancakeswap.finance/
- Binance — https://binance.com/  
- Nomics — https://nomics.com/  

## Bot Candidates
Freqtrade - https://www.freqtrade.io/en/stable/  
Pros
- Battle tested open source with 5M+ docker pulls
- Supports: Binance, Bittrex, FTX, Kraken, Bitvavo
- Supports 120 other markets potentially though https://github.com/ccxt/ccxt/ 
- Lots of features
Telegram integration
Cons
- Existing implementation, high adoption rate
- Risk disclaimer
Adding Strategies - Step by step guide: https://github.com/freqtrade/freqtrade-strategies#how-to-install-a-strategy 
Strategies - Detailed documentation:
https://www.freqtrade.io/en/stable/strategy-customization/ 
TA Bots
Technical analysis involves using real-world data to try to predict the future of the market. It involves looking at past statistics of the cryptocurrencies in question, including factors like volume and movement.
evaluating the cryptocurrency’s inherent value - by patterns and analytic charting tools - determine strengths and weaknesses and then future patterns
Supported markets
Bitmart — https://www.bitmart.com/ - loads of new altcoins/shitcoins
Dex — https://dex.guru/ - dex
Pancakeswap — https://pancakeswap.finance/ - dex
Binance — https://binance.com/ - cheapest transaction fee



Bot Candidates
Octobot - https://www.octobot.online
Pros
Supports: Binance, Bitmex, BitMax, coinbase, KuCoin, Bitfinex, Bittrex
120 other markets potentially though https://github.com/ccxt/ccxt/ 
Features: arbitrage, social trading, technical analysis (TA), social media processing or even external statistics management like google trends
Cons
Risk disclaimer
Digital Ocean?

Investment Strategies
Whitelist and Blacklist target asset pairs to trade
Fine-tune bot configuration parameters such as max_open_trades, stake_amount, etc.
Backtesting - Backtesting is the process of using recorded data of cryptocurrency / stock markets injected in a system to test its performances on past data.
Live trading with oversight in web interface and notification channels (email, telegram)
Machine Learning models for classification and sentiment analysis
Arbitrage trading: Intra market and in-market cryptocurrency triangle arbitrage

Data Sources
https://coinmarketcap.com/api/ 
Bot output data - SQLite for Freqtrade
Web scaped NLP sentiment data, tagged for asset pairs, markets, products, domains, and generic semantic data

Other Ideas
Automated approach to Content Publishing with bots to inflate the value of an asset momentarily, or to generate a price difference between markets for a given asset pair.
It is possible to register to any platform or service that offers a free tier using the following strategy:
Buy a domain from Google Domains for $12
Enable email aliases for *@newdomain.com -> infinite verifiable email addresses
Buy a phone number on Twilio or SignalWire from $1 - $20 -> infinite verifiable phone numbers
Register to free service, if asked, use a prepaid Revolut temporary virtual card and it will not be charged once the service switched to a paid tier
For legal identity verification, it’s possible to buy fake ID documents on the dark web ($$$) -> infinite verifiable identities

Applied ML
It is possible to use the OpenAI API to run ML models as a service. Possible use cases for applied Machine Learning in the crypto trading domain are:
Reinforcement Learning and training ML models new models on the databases
Create a new model architecture version to improve performance
Applied NLP for sentiment analysis of posts, comments, articles and online content

Read more on OpenAI blog
Live training custom models using OpenAI Gym in an Nvidia Tesla M60 GPU accelerated environment in Azure
Using time series data to predict future asset value with Reinforcement Learning while backtesting Recurrent LSTM models
