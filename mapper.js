'use strict';

const mapperRouter = require('express').Router();
const instruments = require('./instruments.json');

mapperRouter.get('/names', (_, response) => {
  const nameSet = new Set();
  instruments.forEach((i) => {
    if (i.name && i.instrument_type !== 'FUT') {
      nameSet.add(i.name);
    }
  });
  response.send([...nameSet]);
});

mapperRouter.get('/byName', (request, response) => {
  const name = request.query.name;
  if (!name) {
    response.json([]);
  } else {
    response.json(instruments.filter((i) => i.instrument_type !== 'FUT' && i.name === name));
  }
});

mapperRouter.get('/tradingSymbols', (_, response) => {
  response.send(instruments.map((i) => i.tradingsymbol));
});

mapperRouter.get('/byTradingSymbol', (request, response) => {
  const name = request.query.name;
  if (!name) {
    response.json(null);
  } else {
    response.json(instruments.find((i) => i.tradingsymbol === name));
  }
});

module.exports = mapperRouter;
