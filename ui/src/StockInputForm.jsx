import React, { useEffect, useState } from 'react';
import { Button, Select, InputNumber } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import axios from 'axios';

import './StockInputForm.css';
import { blue } from '@ant-design/colors';

const StockInputForm = ({ label, handleChange }) => {
  const name = 'NIFTY';
  const [selected, setSelected] = useState(false);
  const [data, setData] = useState([]);
  const [strikePrice, setStrikePrice] = useState(
    localStorage.getItem(`${label}.strikePrice`) || '',
  );
  const [expiry, setExpiry] = useState(localStorage.getItem(`${label}.expiry`) || '');
  const [quantity, setQuantity] = useState(localStorage.getItem(`${label}.quantity`) || 75);
  const [iType, setIType] = useState(localStorage.getItem(`${label}.iType`) || 'CE');
  const transactionType = 'BUY';

  useEffect(() => {
    axios.get('http://localhost:4400/mapper/byName', { params: { name: name } }).then((result) => {
      setData(result.data);
    });
  }, [name]);

  useEffect(() => {
    setSelected(false);
    const x = data.find((d) => d.tradingsymbol === `${name}${expiry}${strikePrice}${iType}`);
    if (x && quantity) {
      setSelected(true);
      handleChange({
        ...x,
        transactionType: transactionType,
        product: 'NRML',
        quantity: parseInt(quantity),
      });
    }
  }, [data, name, expiry, strikePrice, iType, transactionType, quantity, handleChange]);

  const mapToStrikePrice = (stockArray) => {
    if (stockArray.length === 0) return [];

    let spSet = new Set();
    stockArray.forEach((s) => {
      spSet.add(s.strike.toString());
    });
    return [...spSet];
  };

  const mapToExpiry = (stockArray, name, strikePrice) => {
    if (stockArray.length === 0) return [];

    let expirySet = new Set();
    stockArray
      .filter((s) => s.strike.toString() === strikePrice)
      .forEach((s) => {
        const ts = s.tradingsymbol;
        const tsTrimmed = ts.substr(0, ts.lastIndexOf(strikePrice));
        const expiry = tsTrimmed.slice(name.length);
        if (expiry) expirySet.add(expiry);
      });
    return [...expirySet];
  };

  return (
    <div className="input_container">
      <div className="input_element">
        <Button type="primary" size="large">
          STOCK {label}:
        </Button>
      </div>
      <div className="input_element">
        <Select size="large" value={name} disabled></Select>
      </div>
      <div className="input_element">
        <Select
          size="large"
          showSearch
          style={{ width: 200 }}
          placeholder="Select Strike Price"
          value={strikePrice}
          options={mapToStrikePrice(data).map((d) => {
            return { label: d, value: d };
          })}
          onSelect={(newValue) => {
            localStorage.setItem(`${label}.strikePrice`, newValue);
            setStrikePrice(newValue);
          }}
        ></Select>
      </div>
      <div className="input_element">
        <Select
          size="large"
          showSearch
          style={{ width: 150 }}
          placeholder="Select Expiry"
          value={expiry}
          options={mapToExpiry(data, name, strikePrice).map((d) => {
            return { label: d, value: d };
          })}
          onSelect={(newValue) => {
            localStorage.setItem(`${label}.expiry`, newValue);
            setExpiry(newValue);
          }}
        ></Select>
      </div>
      <div className="input_element">
        <Select
          size="large"
          value={iType}
          options={['CE', 'PE'].map((d) => {
            return { label: d, value: d };
          })}
          onSelect={(newValue) => {
            localStorage.setItem(`${label}.iType`, newValue);
            setIType(newValue);
          }}
        ></Select>
      </div>
      <div className="input_element">
        <InputNumber
          size="large"
          value={quantity}
          min={0}
          onChange={(newValue) => {
            localStorage.setItem(`${label}.quantity`, newValue);
            setQuantity(newValue);
          }}
        />
      </div>
      <div className="input_element">
        <Select size="large" value={transactionType} disabled></Select>
      </div>
      {selected ? (
        <CheckCircleTwoTone style={{ fontSize: '2rem' }} />
      ) : (
        <CheckCircleTwoTone twoToneColor={blue[0]} style={{ fontSize: '2rem' }} />
      )}
    </div>
  );
};

export default StockInputForm;
