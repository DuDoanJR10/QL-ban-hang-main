import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import appReducers from './store';
import { Provider } from 'react-redux';
import './i18n';

const store = configureStore({
  reducer: appReducers,
});

ReactDOM.render(
  <div className="App">
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
  document.getElementById('root')
);
