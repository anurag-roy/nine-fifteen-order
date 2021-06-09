import React, {useEffect, useState} from "../web_modules/react.js";
import {Select, InputNumber} from "../web_modules/antd.js";
import {CheckCircleTwoTone, MinusCircleTwoTone} from "../web_modules/@ant-design/icons.js";
import axios2 from "../web_modules/axios.js";
import "./StockInputForm.css.proxy.js";
import {blue, red} from "../web_modules/@ant-design/colors.js";
const StockInputForm2 = ({label, updateRow, deleteRow}) => {
  const [tradingSymbols, setTradingSymbols] = useState([]);
  const [type, setType] = useState("STOCK");
  const [selectedTradingSymbol, setSelectedTradingSymbol] = useState(null);
  const [selected, setSelected] = useState(false);
  const [price, setPrice] = useState(0.05);
  const [quantity, setQuantity] = useState(75);
  const [transactionType, setTransactionType] = useState("BUY");
  useEffect(async () => {
    const {data} = await axios2.get("http://localhost:4400/mapper/tradingSymbols");
    setTradingSymbols(data);
  }, []);
  useEffect(async () => {
    setSelected(false);
    if (selectedTradingSymbol && quantity) {
      setSelected(true);
      updateRow(label, {
        tradingsymbol: selectedTradingSymbol,
        transactionType,
        price,
        product: type === "STOCK" ? "CNC" : "NRML",
        quantity: parseInt(quantity)
      });
    }
  }, [type, selectedTradingSymbol, transactionType, price, quantity]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "input_container"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "input_element"
  }, /* @__PURE__ */ React.createElement(MinusCircleTwoTone, {
    onClick: () => deleteRow(label),
    twoToneColor: red[3],
    style: {fontSize: "1.5rem"}
  })), /* @__PURE__ */ React.createElement("div", {
    className: "input_element"
  }, /* @__PURE__ */ React.createElement(Select, {
    size: "large",
    value: type,
    options: ["STOCK", "OPTION"].map((n) => {
      return {label: n, value: n};
    }),
    onSelect: (newValue) => {
      setType(newValue);
    }
  })), /* @__PURE__ */ React.createElement("div", {
    className: "input_element"
  }, /* @__PURE__ */ React.createElement(Select, {
    size: "large",
    showSearch: true,
    style: {width: 300},
    placeholder: "Select Name",
    value: selectedTradingSymbol,
    options: tradingSymbols.map((n) => {
      return {label: n, value: n};
    }),
    onSelect: (newValue) => {
      setSelectedTradingSymbol(newValue);
    }
  })), /* @__PURE__ */ React.createElement("div", {
    className: "input_element"
  }, /* @__PURE__ */ React.createElement(InputNumber, {
    size: "large",
    style: {width: 120},
    formatter: (value) => `\u20B9 ${value}`,
    step: 0.5,
    value: price,
    min: 0,
    onChange: (newValue) => {
      setPrice(newValue);
    }
  })), /* @__PURE__ */ React.createElement("div", {
    className: "input_element"
  }, /* @__PURE__ */ React.createElement(InputNumber, {
    size: "large",
    value: quantity,
    min: 0,
    onChange: (newValue) => {
      setQuantity(newValue);
    }
  })), /* @__PURE__ */ React.createElement("div", {
    className: "input_element"
  }, /* @__PURE__ */ React.createElement(Select, {
    size: "large",
    value: transactionType,
    options: ["BUY", "SELL"].map((n) => {
      return {label: n, value: n};
    }),
    onSelect: (newValue) => {
      setTransactionType(newValue);
    }
  })), selected ? /* @__PURE__ */ React.createElement(CheckCircleTwoTone, {
    style: {fontSize: "2rem"}
  }) : /* @__PURE__ */ React.createElement(CheckCircleTwoTone, {
    twoToneColor: blue[0],
    style: {fontSize: "2rem"}
  }));
};
export default StockInputForm2;
