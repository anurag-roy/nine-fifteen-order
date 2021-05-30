const fs = require('fs');
const instruments = require('./instruments.json');

// const sampleInstrument = {
//   instrument_token: '3693569',
//   exchange_token: '14428',
//   tradingsymbol: 'GOLDBEES',
//   name: 'NIP IND ETF GOLD BEES',
//   last_price: 0,
//   expiry: '',
//   strike: 0,
//   tick_size: 0.01,
//   lot_size: 1,
//   instrument_type: 'EQ',
//   segment: 'NSE',
//   exchange: 'NSE',
// };

const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

const listUnique = (...props) => {
  let result = {};

  for (let prop of props) {
    const uniqueItems = instruments.map((i) => i[prop]).filter(onlyUnique);
    result[prop] = uniqueItems;
  }

  return result;
};

console.log(listUnique('exchange', 'segment', 'instrument_type'));
