import React, {useEffect, useState} from "../web_modules/react.js";
import {Button, Select, InputNumber} from "../web_modules/antd.js";
import {CheckCircleTwoTone, MinusCircleTwoTone} from "../web_modules/@ant-design/icons.js";
import axios2 from "../web_modules/axios.js";
import "./StockInputForm.css.proxy.js";
import {blue, red} from "../web_modules/@ant-design/colors.js";
const StockInputForm2 = ({label, updateRow, deleteRow}) => {
  const name = "NIFTY";
  const [selected, setSelected] = useState(false);
  const [data, setData] = useState([]);
  const [strikePrice, setStrikePrice] = useState("");
  const [expiry, setExpiry] = useState("");
  const [quantity, setQuantity] = useState(75);
  const [iType, setIType] = useState("CE");
  const transactionType = "BUY";
  useEffect(() => {
    axios2.get("http://localhost:4400/mapper/byName", {params: {name}}).then((result) => {
      setData(result.data);
    });
  }, []);
  useEffect(() => {
    setSelected(false);
    const x = data.find((d) => d.tradingsymbol === `${name}${expiry}${strikePrice}${iType}`);
    if (x && quantity) {
      setSelected(true);
      updateRow(label, {
        ...x,
        transactionType,
        product: "NRML",
        quantity: parseInt(quantity)
      });
    }
  }, [expiry, strikePrice, iType, transactionType, quantity]);
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
  }, /* @__PURE__ */ React.createElement(MinusCircleTwoTone, {
    onClick: () => deleteRow(label),
    twoToneColor: red[3],
    style: {fontSize: "1.5rem"}
  })), /* @__PURE__ */ React.createElement("div", {
    className: "input_element"
  }, /* @__PURE__ */ React.createElement(Button, {
    type: "primary",
    size: "large"
  }, "STOCK ", label + 1, ":")), /* @__PURE__ */ React.createElement("div", {
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
      setIType(newValue);
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
    disabled: true
  })), selected ? /* @__PURE__ */ React.createElement(CheckCircleTwoTone, {
    style: {fontSize: "2rem"}
  }) : /* @__PURE__ */ React.createElement(CheckCircleTwoTone, {
    twoToneColor: blue[0],
    style: {fontSize: "2rem"}
  }));
};
export default StockInputForm2;
