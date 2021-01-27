import React, {useState} from "../web_modules/react.js";
import {Button, Divider, Result, message} from "../web_modules/antd.js";
import StockInputForm2 from "./StockInputForm.js";
import SelectedStock2 from "./SelectedStock.js";
import axios2 from "../web_modules/axios.js";
import "./InputForm.css.proxy.js";
import "./StockInputForm.css.proxy.js";
const InputForm2 = () => {
  const [state, setState] = useState("initial");
  const [stockA, setStockA] = useState();
  const [stockB, setStockB] = useState();
  const [stockC, setStockC] = useState();
  const proceedButton = () => {
    if (!stockA || !stockB || !stockC) {
      message.error("One or more invalid stocks selected. Please select valid stocks and try again.");
    } else {
      axios2.post(`http://localhost:4400/nineFifteenOrder`, {stockArray: [stockA, stockB, stockC]}).then((data) => console.log(data)).catch((error) => console.error(error));
      setState("done");
    }
  };
  if (state === "initial") {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
      className: "form_container"
    }, /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(StockInputForm2, {
      label: "A",
      handleChange: setStockA
    }), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(StockInputForm2, {
      label: "B",
      handleChange: setStockB
    }), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(StockInputForm2, {
      label: "C",
      handleChange: setStockC
    }), /* @__PURE__ */ React.createElement(Divider, null)), /* @__PURE__ */ React.createElement("div", {
      className: "input_container"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "input_element"
    }, /* @__PURE__ */ React.createElement(SelectedStock2, {
      input: "A",
      data: stockA
    })), /* @__PURE__ */ React.createElement("div", {
      className: "input_element"
    }, /* @__PURE__ */ React.createElement(SelectedStock2, {
      input: "B",
      data: stockB
    })), /* @__PURE__ */ React.createElement("div", {
      className: "input_element"
    }, /* @__PURE__ */ React.createElement(SelectedStock2, {
      input: "C",
      data: stockC
    }))), /* @__PURE__ */ React.createElement("div", {
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
