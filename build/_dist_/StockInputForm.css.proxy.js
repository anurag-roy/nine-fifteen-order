// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".input_container {\n  display: flex;\n  justify-content: center;\n  margin: 1em;\n  padding: 1em;\n}\n\n.input_element {\n  margin: 0em 1em;\n  align-self: center;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}