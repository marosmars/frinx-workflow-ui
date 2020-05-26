import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const conductorApiUrlPrefix = "/api/conductor";
const frontendUrlPrefix = "/workflows";

ReactDOM.render(
  <App
    frontendUrlPrefix={frontendUrlPrefix}
    backendApiUrlPrefix={conductorApiUrlPrefix}
  />,
  document.getElementById("root")
);
