import React from "react";
import ReactDOM from "react-dom/client";
// import Login from './pages/login/index.tsx';
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "@/styles/listButton.less";
import "@/styles/product.less";
import "@/styles/alert.less"
import "@/styles/monitoring.less"
import "@/styles/diagram.less"
// import "@arco-design/mobile-react/esm/style/index.less"; // 必须在自定义主题之后引入

// import setRootPixel from '@arco-design/mobile-react/tools/flexible';

// setRootPixel(100);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <App />
  // {/* </React.StrictMode> */}
);

reportWebVitals();
