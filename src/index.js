import React from 'react';
import ReactDOM from 'react-dom/client';
// import Login from './pages/login/index.tsx';
import reportWebVitals from './reportWebVitals';
import App from "./App"
// import setRootPixel from '@arco-design/mobile-react/tools/flexible';

// setRootPixel(100);
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  
  // <React.StrictMode>
    <App/>
  // {/* </React.StrictMode> */}
);


reportWebVitals();
