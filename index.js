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

// Order function
const order = (stock) => {
  console.log(
    `Placing order for ${stock.exchange}:${stock.tradingsymbol}, Transaction: ${stock.transactionType}, product: ${stock.product}, quantity: ${stock.quantity}, price: ${stock.price}`,
  );
  console.log(`Time of order: ${new Date().toLocaleTimeString()}`);

  return kc.placeOrder('regular', {
    exchange: stock.exchange,
    tradingsymbol: stock.tradingsymbol,
    transaction_type: stock.transactionType,
    quantity: stock.quantity,
    product: stock.product, // NRML
    price: stock.price,
    order_type: 'LIMIT',
  });
};

const placeOrder = async (stockArray) => {
  const promiseArray = stockArray.map((s) => order(s));

  try {
    await Promise.all(promiseArray);
    console.log('All orders were successful');
  } catch (error) {
    console.log('Some error occurred while placing orders: ', error);
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
      exchange: instruments.find((i) => i.tradingsymbol === s.tradingsymbol).exchange,
    };
  });
  // Flag to determine if order is already placed or not
  let placedOrder = false;

  // Current Date
  const cd = new Date();
  // Target Time
  const tt = new Date(cd.getFullYear(), cd.getMonth(), cd.getDate(), 9, 15, 0, 1).getTime();

  while (!placedOrder) {
    if (new Date().getTime() >= tt) {
      placedOrder = true;
      await placeOrder(stockArray);
    }
  }

  http.close();
};

http.listen(4400, () => {
  console.log('9:15 Exit started on http://localhost:4400');
});
