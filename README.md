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
### GET `http://localhost:8888/v4/order/:orderId`

### GET `http://localhost:8888/v4/order`
> Params: `orderId=156201996458139136`

### POST `http://localhost:8888/v4/order`
> Params: `{"symbol":"XT_USDT","side":"BUY","bizType":"SPOT","quantity":2,"price":3,"type":"LIMIT","timeInForce":"GTC"}`

### DELETE `http://localhost:8888/v4/order/:orderId`

### GET `http://localhost:8888/v4/batch-order`
> Params: `{"orderIds": "156201996458139136,12312313212"}`

### DELETE `http://localhost:8888/v4/batch-order`
> Params: `{"orderIds":[156201996458139136,12312313212],"clientBatchId":"123123111"}`

### GET `http://localhost:8888/v4/open-order`

### DELETE `http://localhost:8888/v4/open-order`
> Body: `{"bizType":"SPOT"}`

### GET `http://localhost:8888/v4/history-order`
> Params: `{"bizType":"SPOT"}`


### GET `http://localhost:8888/v4/trade`
> Params: `{"bizType":"SPOT"}`

### GET `http://localhost:8888/v4/balance`
> Params: `{"currency":"usdt"}`

### GET `http://localhost:8888/v4/balances`
> Params: `{"currencies":"btc,usdt"}`
