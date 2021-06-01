import React, {useState} from "../web_modules/react.js";
import {Button, Divider, Result, message} from "../web_modules/antd.js";
import StockInputForm2 from "./StockInputForm.js";
import axios2 from "../web_modules/axios.js";
import {PlusCircleTwoTone} from "../web_modules/@ant-design/icons.js";
import "./InputForm.css.proxy.js";
import "./StockInputForm.css.proxy.js";
const InputForm2 = () => {
  const [state, setState] = useState("initial");
  const [stockArray, setStockArray] = useState([]);
  const proceedButton = () => {
    if (stockArray.some((s) => !s.tradingsymbol || !s.price || !s.quantity || !s.transactionType)) {
      message.error("One or more invalid inputs selected. Please select valid inputs and try again.");
    } else {
      axios2.post(`http://localhost:4400/nineFifteenOrder`, {stockArray}).then((data) => console.log(data)).catch((error) => console.error(error));
      setState("done");
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
    console.log("before: ", stockArray);
    console.log(`Removing row ${index}`);
    let copiedStockArray = [...stockArray];
    copiedStockArray.splice(index, 1);
    console.log("after: ", copiedStockArray);
    setStockArray(copiedStockArray);
  };
  if (state === "initial") {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
      className: "form_container"
    }, /* @__PURE__ */ React.createElement(Divider, null), stockArray.map((stock, index) => /* @__PURE__ */ React.createElement(StockInputForm2, {
      key: index,
      label: index,
      updateRow: updateStockArray,
      deleteRow: removeExistingStock
    })), /* @__PURE__ */ React.createElement(PlusCircleTwoTone, {
      style: {fontSize: "2rem"},
      onClick: addNewStock
    }), /* @__PURE__ */ React.createElement(Divider, null)), /* @__PURE__ */ React.createElement("div", {
      className: "input_container"
    }, /* @__PURE__ */ React.createElement(Button, {
      type: "primary",
      size: "large",
      onClick: proceedButton
    }, "Place Order")));
  } else {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Result, {
      status: "success",
      title: "Program started.",
      subTitle: "Please check console."
    }));
  }
};
export default InputForm2;
