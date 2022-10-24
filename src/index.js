import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import App from './App';
import { getStateFromLocalStorage, setupStore } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = setupStore(getStateFromLocalStorage());
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);