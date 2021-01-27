import React from "../web_modules/react.js";
import {Card, Typography} from "../web_modules/antd.js";
const SelectedStock = ({input, data}) => {
  const {Title} = Typography;
  let body = /* @__PURE__ */ React.createElement(React.Fragment, null);
  if (!data) {
    body = /* @__PURE__ */ React.createElement("p", null, "Not a Valid Stock");
  } else {
    body = /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Title, {
      level: 4
    }, " ", data.tradingsymbol), "Name: ", data.name, " ", /* @__PURE__ */ React.createElement("br", null), "Expiry Date: ", data.expiry.replace("T00:00:00.000Z", ""), " ", /* @__PURE__ */ React.createElement("br", null), "Strike Price: ", data.strike, " ", /* @__PURE__ */ React.createElement("br", null), "Lot Size: ", data.lot_size, " ", /* @__PURE__ */ React.createElement("br", null), "Instrument Type: ", data.instrument_type, " ", /* @__PURE__ */ React.createElement("br", null), "Exchange: ", data.exchange, " ", /* @__PURE__ */ React.createElement("br", null), "Transaction: ", data.transactionType, " ", /* @__PURE__ */ React.createElement("br", null), "Quantity: ", data.quantity);
  }
  return /* @__PURE__ */ React.createElement(Card, {
    title: `Selected Stock ${input}:`,
    style: {width: 400}
  }, body);
};
export default SelectedStock;
