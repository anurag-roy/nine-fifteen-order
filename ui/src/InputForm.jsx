import React, { useState } from 'react';
import { Button, Divider, Result, message } from 'antd';
import StockInputForm from './StockInputForm';
import SelectedStock from './SelectedStock';
import axios from 'axios';

import './InputForm.css';
import './StockInputForm.css';

const InputForm = () => {
  const [state, setState] = useState('initial');

  const [stockA, setStockA] = useState();
  const [stockB, setStockB] = useState();
  const [stockC, setStockC] = useState();

  const proceedButton = () => {
    if (!stockA || !stockB || !stockC) {
      message.error(
        'One or more invalid stocks selected. Please select valid stocks and try again.',
      );
    } else {
      axios
        .post(`http://localhost:4400/nineFifteenOrder`, { stockArray: [stockA, stockB, stockC] })
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
      setState('done');
    }
  };

  if (state === 'initial') {
    return (
      <>
        <div className="form_container">
          <Divider />
          <StockInputForm label="A" handleChange={setStockA} />
          <Divider />
          <StockInputForm label="B" handleChange={setStockB} />
          <Divider />
          <StockInputForm label="C" handleChange={setStockC} />
          <Divider />
        </div>
        <div className="input_container">
          <div className="input_element">
            <SelectedStock input={'A'} data={stockA} />
          </div>
          <div className="input_element">
            <SelectedStock input={'B'} data={stockB} />
          </div>
          <div className="input_element">
            <SelectedStock input={'C'} data={stockC} />
          </div>
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
