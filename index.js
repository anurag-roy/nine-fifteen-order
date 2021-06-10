'use strict';

require('dotenv').config();
const path = require('path');
const cors = require('cors');
const express = require('express');
const KiteConnect = require('kiteconnect').KiteConnect;

const instruments = require('./instruments.json');

const app = express();
const mapperRouter = require('./mapper');
const http = require('http').createServer(app);

const apiKey = process.env.API_KEY;
const accessToken = process.env.ACCESS_TOKEN;

const kc = new KiteConnect({
  api_key: apiKey,
});
kc.setAccessToken(accessToken);

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.use('/mapper', mapperRouter);

const placeOrder = (stockArray) => {
  for (let i = 0; i < stockArray.length; i++) {
    kc.placeOrder('regular', stockArray[i])
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }
};

app.post('/nineFifteenOrder', async ({ body }, response) => {
  console.log(body);
  response.send('Check console.');
  await nineFifteenOrder(body.stockArray);
});

// 9:15 Order
const nineFifteenOrder = async (stockArray) => {
  stockArray = stockArray.map((s) => {
    return {
      ...s,
      transaction_type: s.transactionType,
      exchange: instruments.find((i) => i.tradingsymbol === s.tradingsymbol).exchange,
      order_type: 'LIMIT',
    };
  });
  // Flag to determine if order is already placed or not
  let placedOrder = false;

  // Current Date
  const cd = new Date();
  // Target Time
  const tt = new Date(cd.getFullYear(), cd.getMonth(), cd.getDate(), 9, 14, 58, 0).getTime();

  while (!placedOrder) {
    if (new Date().getTime() >= tt) {
      placedOrder = true;

      // repeat with the interval of 1/2 second
      let orderTimerId = setInterval(() => placeOrder(stockArray), 500);

      // after 5.5 seconds stop
      setTimeout(() => {
        clearInterval(orderTimerId);
        console.log('Placed all orders');
      }, 5500);
    }
  }

  http.close();
};

http.listen(4400, () => {
  console.log('9:15 Exit started on http://localhost:4400');
});
