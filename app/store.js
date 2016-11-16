import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router';

import rootReducer from './reducers/index';

const initialState = {}

const store = createStore(rootReducer, initialState, compose(
                          applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

if(module.hot) {
  // Enable Webpack hit module replacement for reducers
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers/index')
    store.replaceReducer(nextRootReducer);
  });
}

export const history = syncHistoryWithStore(browserHistory, store);
export default store;
