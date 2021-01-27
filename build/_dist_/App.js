import React from "../web_modules/react.js";
import InputForm2 from "./InputForm.js";
import "../web_modules/antd/dist/antd.css.proxy.js";
import {Typography} from "../web_modules/antd.js";
import {blue} from "../web_modules/@ant-design/colors.js";
const App = () => {
  const {Title} = Typography;
  return /* @__PURE__ */ React.createElement("div", {
    style: {backgroundColor: blue[0], minHeight: "100vh"}
  }, /* @__PURE__ */ React.createElement(Title, {
    style: {textAlign: "center", paddingTop: "1em"}
  }, "9:15 Order"), /* @__PURE__ */ React.createElement(InputForm2, null));
};
export default App;
