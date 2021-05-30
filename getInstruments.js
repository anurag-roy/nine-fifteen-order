'use strict';

require('dotenv').config();
const fs = require('fs');
const KiteConnect = require('kiteconnect').KiteConnect;

const apiKey = process.env.API_KEY;
const accessToken = process.env.ACCESS_TOKEN;

const kc = new KiteConnect({
  api_key: apiKey,
});
kc.setAccessToken(accessToken);

const main = async () => {
  try {
    // Populate list of instruments
    const allowedExchanges = ['MCX', 'NSE', 'CDS', 'NFO'];
    const instruments = await kc.getInstruments();
    const validInstruments = instruments.filter((i) => allowedExchanges.includes(i.exchange));
    fs.writeFileSync('instruments.json', JSON.stringify(validInstruments), (error) => {
      if (error) console.log('Error while writing instruments', error);
    });
  } catch (error) {
    console.log('Error while fetching instruments: ', error);
  }
};

main();
