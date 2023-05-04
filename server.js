const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const Api = require('./api');
Api(app);

// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By",' 4.0.0');
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });

app.get('/', function (req, res) {
  console.log("Hello World");
  res.send('Hello World');
});


const server = app.listen(8888, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log("node start http://%s:%s", host, port);
});