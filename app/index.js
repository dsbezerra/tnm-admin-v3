import 'babel-polyfill';
import 'es6-shim';

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import FastClick from 'fastclick';

import styles from './stylesheets/main.css';
import routes from './routes';
import store, { history } from './store';

// Make taps on links and buttons work fast on mobiles
FastClick.attach(document.body);

render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app'));

// Enable Webpack Hot Module
if(module.hot) {
  module.hot.accept();
}
