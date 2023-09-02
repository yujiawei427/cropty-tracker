import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import CryptoContext from './CryptoContext';

ReactDOM.render(
  <React.StrictMode>
    <CryptoContext>
      <App />
    </CryptoContext>
  </React.StrictMode>,
  document.getElementById('root'),
);