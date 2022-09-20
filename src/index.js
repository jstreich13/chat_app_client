import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Home from "./pages/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));

const generateRoute = () => {
  return Home;
};

root.render(
  <div>
    <App Component={generateRoute()} />
  </div>
);

// * to add more components, use routing and generate route function where Home is above
// *

// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
