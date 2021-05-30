import React, { useState } from 'react';
import { Button, Divider, Result, message } from 'antd';
import StockInputForm from './StockInputForm';
import axios from 'axios';

import { PlusCircleTwoTone } from '@ant-design/icons';
import './InputForm.css';
import './StockInputForm.css';

const InputForm = () => {
  const [state, setState] = useState('initial');

  const [stockArray, setStockArray] = useState([]);

  const proceedButton = () => {
    if (stockArray.some((s) => !s.tradingsymbol || !s.price || !s.quantity || !s.transactionType)) {
      message.error(
        'One or more invalid stocks selected. Please select valid stocks and try again.',
      );
    } else {
      axios
        .post(`http://localhost:4400/nineFifteenOrder`, { stockArray })
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
      setState('done');
    }
  };

  const addNewStock = () => {
    let copiedStockArray = [...stockArray];
    copiedStockArray.push({});
    setStockArray(copiedStockArray);
  };

  const updateStockArray = (index, newStockData) => {
    let copiedStockArray = [...stockArray];
    copiedStockArray[index] = newStockData;
    setStockArray(copiedStockArray);
  };

  const removeExistingStock = (index) => {
    console.log('before: ', stockArray);
    console.log(`Removing row ${index}`);
    let copiedStockArray = [...stockArray];
    copiedStockArray.splice(index, 1);
    console.log('after: ', copiedStockArray);
    setStockArray(copiedStockArray);
  };

  if (state === 'initial') {
    return (
      <>
        <div className="form_container">
          <Divider />
          {stockArray.map((stock, index) => (
            <StockInputForm
              key={index}
              label={index}
              updateRow={updateStockArray}
              deleteRow={removeExistingStock}
            />
          ))}
          <PlusCircleTwoTone style={{ fontSize: '2rem' }} onClick={addNewStock}></PlusCircleTwoTone>
          <Divider />
        </div>
        <div className="input_container">
          <Button type="primary" size="large" onClick={proceedButton}>
            Place Order
          </Button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Result status="success" title="Program started." subTitle="Please check console." />
      </>
    );
  }
};

export default InputForm;
