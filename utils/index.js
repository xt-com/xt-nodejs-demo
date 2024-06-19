const Request = require('request');
const qs = require('qs');
const Config = require('../config');
const Crypto = require('crypto');


module.exports = function(query, res) {
    if(query.apiType == 'fapi'){
        handleFapi(query, res);
        return ;
    }
    console.log("get",query);
    // CONST
    const encry = "HmacSHA256";
    const window = "6000";
    const time = new Date().getTime();
    const xtHeaders = {
        'validate-algorithms': encry,
        'validate-appkey': Config.appkey,
        'validate-recvwindow': window,
        'validate-timestamp': time,
    }

    // Signature
    let x = qs.stringify(xtHeaders);
    let y = "#"+ query.method + "#"+ query.path;
    // query
    if (query.param) {
        // y += "#" + decodeURIComponent(qs.stringify(query.param));
        y += "#" + decodeURIComponent(qs.stringify(query.param, {sort:(a, b) => a.localeCompare(b)}));
    }
    // body
    if (query.body && query.body != {}) {
        y += "#" + JSON.stringify(query.body);
    }
    let origin = x + y;
    console.log(origin,"origin")
    const signature = Crypto.createHmac('sha256', Config.SecretKey).update(origin).digest('hex') || "";
    console.log(signature,"signature")

    // API
    Request({
        timeout: 10000,
        url: Config.URL + query.path + `${query && query.param ? "?" + qs.stringify(query.param) : ''}`,
        method: query.method,
        headers: {
            ...xtHeaders,
            'validate-signature': signature
        },
        body: query.body || null,
        json: true,
        }, function (error, response, body) {
        console.log(body);
        res.send(body);
    })

} 

function getFutureBatchParams(batchBody){
   return "list=" +  JSON.stringify(batchBody)
}

function futureGenerateSign(timestamp, query){
    let x = "validate-appkey="+  Config.appkey +"&validate-timestamp="+timestamp
    let y = "#" + query.path
    // body
    if (query.body && query.body != {}) {
        y += "#" + JSON.stringify(query.body);
    }
    if (query.batchBody && query.batchBody != {}) {
        y += "#" + getFutureBatchParams(query.batchBody);
    }
    let origin = x + y;
    return Crypto.createHmac('sha256', Config.SecretKey).update(origin).digest('hex') || "";
  }
  
  function getFutureXtHeaders(query){
    // CONST
    const window = "6000";
    const timestamp = new Date().getTime();
    const signature = futureGenerateSign(timestamp, query);
    const xtHeaders = {
        'Content-Type': query.ContentType,
        'validate-algorithms': "HmacSHA256",
        'validate-appkey': Config.appkey,
        'validate-recvwindow': window,
        'validate-timestamp': timestamp,
        'validate-signature': signature
    }
    return xtHeaders;
  }

  function handleFapi(query, res){
    let xtHeaders = getFutureXtHeaders(query)
    let param = "";
    if(query.batchBody){
        param = '?' +  "list=" + encodeURIComponent(JSON.stringify(query.batchBody));
    }

    let reqParams = {
        timeout: 10000,
        url: Config.FURL + query.path + param,
        method: query.method,
        headers: {
            ...xtHeaders,
        },
        body: query.body || null,
    }

    if (query.ContentType == "application/json"){
        reqParams.json = true
    }

    Request(reqParams,
        function (error, response, body) {
        console.log(body);
        res.send(body);
    })
  }