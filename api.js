/**
 * @name V4 API
 * @author John
 * @create 2022/11/08 15:04
 */

const Request = require('request');
const qs = require('qs');
const RequestApi = require('./utils/index');

module.exports = function (app) {
  // Single acquisition 
  app.get('/v4/order/:orderId', function (req, res) {
    // Test
    req.params = { orderId: 156201996458139136 }
    // Request
    RequestApi({
      path: "/v4/order/" + req.params.orderId,
      method: "GET",
    }, res );
  });

  // Single query 
  app.get('/v4/order', function (req, res) {
    console.log(req.param,"req.query")
    // Test
    req.query = { orderId: 156201996458139136 }
    // Request
    return RequestApi({
      path: "/v4/order",
      method: "GET",
      param: req.query,  
    }, res );
  });

  // Single order 
  app.post('/v4/order', function (req, res) {
    console.log(req.body,"req.body")
    // Test
    req.body = {"symbol":"XT_USDT","side":"BUY","bizType":"SPOT","quantity":2,"price":3,"type":"LIMIT","timeInForce":"GTC"}
    // Request
    return RequestApi({
      path: "/v4/order",
      method: "POST",
      body: req.body,  
    }, res );
  });

  // Single cancellation 
  app.delete('/v4/order/:orderId', function (req, res) {
    // Test
    req.params = { orderId: 156201996458139136 }
    // Request
    return RequestApi({
      path: "/v4/order/"+req.params.orderId,
      method: "DELETE",
    }, res );
  });

  // Batch acquisition 
  app.get('/v4/batch-order', function (req, res) {
    // Test
    req.query = {"orderIds": "156201996458139136,12312313212"};
    // Request
    return RequestApi({
      path: "/v4/batch-order",
      method: "GET",
      param: req.query,  
    }, res );
  });

  // Batch cancellation 
  app.delete('/v4/batch-order', function (req, res) {
    // Test
    req.body = {"orderIds":[156201996458139136,12312313212],"clientBatchId":"123123111"};
    // Request
    return RequestApi({
      path: "/v4/batch-order",
      method: "DELETE",
      body: req.body,  
    }, res );
  });

  // Query the current bill
  app.get('/v4/open-order', function (req, res) {
    // Request
    return RequestApi({
      path: "/v4/open-order",
      method: "GET",
    }, res );
  });

  // Cancel the current order 
  app.delete('/v4/open-order', function (req, res) {
    // Test
    req.body = {"bizType":"SPOT"};
    // Request
    return RequestApi({
      path: "/v4/open-order",
      method: "DELETE",
      body: req.body,  
    }, res );
  });

  // Historical order query
  app.get('/v4/history-order', function (req, res) {
    // Test
    req.query = {"bizType":"SPOT"};
    // Request
    return RequestApi({
      path: "/v4/history-order",
      method: "GET",
      param: req.query,  
    }, res );
  });
  
  // Transaction inquiry
  app.get('/v4/trade', function (req, res) {
    // Test
    req.query = {"bizType":"SPOT"};
    // Request
    return RequestApi({
      path: "/v4/trade",
      method: "GET",
      param: req.query,  
    }, res );
  });

  // Get single currency assets
  app.get('/v4/balance', function (req, res) {
    // Test
    req.query = {"currency":"usdt"};
    // Request
    return RequestApi({
      path: "/v4/balance",
      method: "GET",
      param: req.query,  
    }, res );
  });

  // Get currency asset list
  app.get('/v4/balances', function (req, res) {
    // Test
    req.query = {"currencies":"btc,usdt"};
    // Request
    return RequestApi({
      path: "/v4/balances",
      method: "GET",
      param: req.query,  
    }, res );
  });

  // future demo
  app.get('/future/order', function (req, res) {
    // Test
    body = {"symbol":"btc_usdt","orderSide":"BUY","origQty":211,"price":65201,"orderType":"LIMIT","timeInForce":"GTC", "positionSide": "LONG"}

    return RequestApi({
      path: "/future/trade/v1/order/create",
      ContentType: "application/json",
      method: "POST",
      body: body,
      apiType: 'fapi'
    }, res );

  });

  app.get('/future/create-batch', function (req, res) {
    // Test
    let orderList = [
      {"symbol":"btc_usdt","orderSide":"BUY","origQty":311,"price":64201,"orderType":"LIMIT","timeInForce":"GTC", "positionSide": "LONG"},
      {"symbol":"eth_usdt","orderSide":"BUY","origQty":411,"price":3200,"orderType":"LIMIT","timeInForce":"GTC", "positionSide": "LONG"}
    ]

    return RequestApi({
      path: "/future/trade/v1/order/create-batch",
      ContentType: "application/x-www-form-urlencoded",
      method: "POST",
      batchBody: orderList,
      apiType: 'fapi'
    }, res );

  });

}