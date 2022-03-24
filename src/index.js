import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {HashRouter} from 'react-router-dom'
import {store} from './redux'
import App from './App';

ReactDOM.render(
  <HashRouter basename='/'>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById('root')
);
