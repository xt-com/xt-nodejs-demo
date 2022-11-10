# XT API 
nodejs

## start
``` bash
# node -v 14.17.3
npm install
# write config.js
node server.js
```

## test
### GET `http://localhost:8888/data/api/v1/getMarketConfig`

### GET `http://localhost:8888/data/api/v1/getKLine`
> Params: `market=btc_usdt&type=15min&since=0`

### GET `http://localhost:8888/data/api/v1/getTicker`
> Params: `market=btc_usdt`

### GET `http://localhost:8888/data/api/v1/getTickers`

### GET `http://localhost:8888/data/api/v1/getDepth`
> Params: `market=btc_usdt`

### GET `http://localhost:8888/data/api/v1/getTrades`
> Params: `market=btc_usdt`

### GET `http://localhost:8888/trade/api/v1/getServerTime`

### GET `http://localhost:8888/trade/api/v1/getBalance`

### GET `http://localhost:8888/trade/api/v1/getAccounts`

### GET `http://localhost:8888/trade/api/v1/getFunds`
> Params: `account=2`

### POST `http://localhost:8888/trade/api/v1/order`
> Content-Type: `application/x-www-form-urlencoded` or `application/json`
```json
{
    "market": "btc_usdt",
    "price": 62317.02,
    "number": 0.596852,
    "type": 1,
    "entrustType": 0
}
```

### POST `http://localhost:8888/trade/api/v1/batchOrder?market=btc_usdt`
> Content-Type: `application/x-www-form-urlencoded` or `application/json`
```json
[
    {
        "price": 62317.02,
        "amount": 1,
        "type": 0
    }, {
        "price": 62317.02,
        "amount": 2,
        "type": 0
    } 
]
```

### POST `http://localhost:8888/trade/api/v1/cancel`
> Content-Type: `application/x-www-form-urlencoded` or `application/json`
```json
{
  "market": "btc_usdt",
  "id": "6861566319764418560"
}
```

### POST `http://localhost:8888/trade/api/v1/batchCancel?market=btc_usdt`
> Content-Type: `application/x-www-form-urlencoded` or `application/json`
```json
[
  "6861566319764418560",
  "6861566319764418561",
  "6861566152621404160"
]
```

### GET `http://localhost:8888/trade/api/v1/getOrder`
> Params: `market=btc_usdt&id=6847812400960688128`

### GET `http://localhost:8888/trade/api/v1/getOpenOrders`
> Params: `market=btc_usdt&page=1&pageSize=10`

### POST `http://localhost:8888/trade/api/v1/getBatchOrders?market=btc_usdt`
> Content-Type: `application/x-www-form-urlencoded` or `application/json`
```json
[
  "6861566319764418560",
  "6861566319764418561",
  "6861566152621404160"
]
```

### GET `http://localhost:8888/trade/api/v1/myTrades`
> Params: `market=btc_usdt`
