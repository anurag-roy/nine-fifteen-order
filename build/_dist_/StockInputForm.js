import React, {useEffect, useState} from "../web_modules/react.js";
import {Button, Select, InputNumber} from "../web_modules/antd.js";
import {CheckCircleTwoTone} from "../web_modules/@ant-design/icons.js";
import axios2 from "../web_modules/axios.js";
import "./StockInputForm.css.proxy.js";
import {blue} from "../web_modules/@ant-design/colors.js";
const StockInputForm2 = ({label, handleChange}) => {
  const name = "NIFTY";
  const [selected, setSelected] = useState(false);
  const [data, setData] = useState([]);
  const [strikePrice, setStrikePrice] = useState(localStorage.getItem(`${label}.strikePrice`) || "");
  const [expiry, setExpiry] = useState(localStorage.getItem(`${label}.expiry`) || "");
  const [quantity, setQuantity] = useState(localStorage.getItem(`${label}.quantity`) || 75);
  const [iType, setIType] = useState(localStorage.getItem(`${label}.iType`) || "CE");
  const transactionType = "BUY";
  useEffect(() => {
    axios2.get("http://localhost:4400/mapper/byName", {params: {name}}).then((result) => {
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
        transactionType,
        product: "NRML",
        quantity: parseInt(quantity)
      });
    }
  }, [data, name, expiry, strikePrice, iType, transactionType, quantity, handleChange]);
  const mapToStrikePrice = (stockArray) => {
    if (stockArray.length === 0)
      return [];
    let spSet = new Set();
    stockArray.forEach((s) => {
      spSet.add(s.strike.toString());
    });
    return [...spSet];
  };
  const mapToExpiry = (stockArray, name2, strikePrice2) => {
    if (stockArray.length === 0)
      return [];
    let expirySet = new Set();
    stockArray.filter((s) => s.strike.toString() === strikePrice2).forEach((s) => {
      const ts = s.tradingsymbol;
      const tsTrimmed = ts.substr(0, ts.lastIndexOf(strikePrice2));
      const expiry2 = tsTrimmed.slice(name2.length);
      if (expiry2)
        expirySet.add(expiry2);
    });
    return [...expirySet];
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: "input_container"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "input_element"
  }, /* @__PURE__ */ React.createElement(Button, {
    type: "primary",
    size: "large"
  }, "STOCK ", label, ":")), /* @__PURE__ */ React.createElement("div", {
    className: "input_element"
  }, /* @__PURE__ */ React.createElement(Select, {
    size: "large",
    value: name,
    disabled: true
  })), /* @__PURE__ */ React.createElement("div", {
    className: "input_element"
  }, /* @__PURE__ */ React.createElement(Select, {
    size: "large",
    showSearch: true,
    style: {width: 200},
    placeholder: "Select Strike Price",
    value: strikePrice,
    options: mapToStrikePrice(data).map((d) => {
      return {label: d, value: d};
    }),
    onSelect: (newValue) => {
      localStorage.setItem(`${label}.strikePrice`, newValue);
      setStrikePrice(newValue);
    }
  })), /* @__PURE__ */ React.createElement("div", {
    className: "input_element"
  }, /* @__PURE__ */ React.createElement(Select, {
    size: "large",
    showSearch: true,
    style: {width: 150},
    placeholder: "Select Expiry",
    value: expiry,
    options: mapToExpiry(data, name, strikePrice).map((d) => {
      return {label: d, value: d};
    }),
    onSelect: (newValue) => {
      localStorage.setItem(`${label}.expiry`, newValue);
      setExpiry(newValue);
    }
  })), /* @__PURE__ */ React.createElement("div", {
    className: "input_element"
  }, /* @__PURE__ */ React.createElement(Select, {
    size: "large",
    value: iType,
    options: ["CE", "PE"].map((d) => {
      return {label: d, value: d};
    }),
    onSelect: (newValue) => {
      localStorage.setItem(`${label}.iType`, newValue);
      setIType(newValue);
    }
  })), /* @__PURE__ */ React.createElement("div", {
    className: "input_element"
  }, /* @__PURE__ */ React.createElement(InputNumber, {
    size: "large",
    value: quantity,
    min: 0,
    onChange: (newValue) => {
      localStorage.setItem(`${label}.quantity`, newValue);
      setQuantity(newValue);
    }
  })), /* @__PURE__ */ React.createElement("div", {
    className: "input_element"
  }, /* @__PURE__ */ React.createElement(Select, {
    size: "large",
    value: transactionType,
    disabled: true
  })), selected ? /* @__PURE__ */ React.createElement(CheckCircleTwoTone, {
    style: {fontSize: "2rem"}
  }) : /* @__PURE__ */ React.createElement(CheckCircleTwoTone, {
    twoToneColor: blue[0],
    style: {fontSize: "2rem"}
  }));
};
export default StockInputForm2;
