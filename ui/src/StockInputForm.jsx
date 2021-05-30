import React, { useEffect, useState } from 'react';
import { Button, Select, InputNumber } from 'antd';
import { CheckCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import axios from 'axios';

import './StockInputForm.css';
import { blue, red } from '@ant-design/colors';

const StockInputForm = ({ label, updateRow, deleteRow }) => {
  const [tradingSymbols, setTradingSymbols] = useState([]);
  const [selectedTradingSymbol, setSelectedTradingSymbol] = useState(null);
  const [selected, setSelected] = useState(false);
  const [price, setPrice] = useState(0.0);
  const [quantity, setQuantity] = useState(75);
  const [transactionType, setTransactionType] = useState('BUY');

  useEffect(async () => {
    const { data } = await axios.get('http://localhost:4400/mapper/tradingSymbols');
    setTradingSymbols(data);
  }, []);

  useEffect(async () => {
    setSelected(false);

    if (selectedTradingSymbol && quantity) {
      setSelected(true);
      updateRow(label, {
        tradingsymbol: selectedTradingSymbol,
        transactionType: transactionType,
        price: price,
        product: 'NRML',
        quantity: parseInt(quantity),
      });
    }
  }, [selectedTradingSymbol, transactionType, quantity]);

  return (
    <div className="input_container">
      <div className="input_element">
        <MinusCircleTwoTone
          onClick={() => deleteRow(label)}
          twoToneColor={red[3]}
          style={{ fontSize: '1.5rem' }}
        />
      </div>
      <div className="input_element">
        <Button type="primary" size="large">
          STOCK {label + 1}:
        </Button>
      </div>
      <div className="input_element">
        <Select
          size="large"
          showSearch
          style={{ width: 300 }}
          placeholder="Select Name"
          value={selectedTradingSymbol}
          options={tradingSymbols.map((n) => {
            return { label: n, value: n };
          })}
          onSelect={(newValue) => {
            setSelectedTradingSymbol(newValue);
          }}
        ></Select>
      </div>
      <div className="input_element">
        <InputNumber
          size="large"
          style={{ width: 120 }}
          formatter={(value) => `₹ ${value}`}
          step={0.5}
          value={price}
          min={0.0}
          onChange={(newValue) => {
            setPrice(newValue);
          }}
        />
      </div>
      <div className="input_element">
        <InputNumber
          size="large"
          value={quantity}
          min={0}
          onChange={(newValue) => {
            setQuantity(newValue);
          }}
        />
      </div>
      <div className="input_element">
        <Select
          size="large"
          value={transactionType}
          options={['BUY', 'SELL'].map((n) => {
            return { label: n, value: n };
          })}
          onSelect={(newValue) => {
            setTransactionType(newValue);
          }}
        ></Select>
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
