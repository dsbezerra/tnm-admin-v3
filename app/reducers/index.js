import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux'

import main from './main';
import summary from './summary';

import agency from './agency';
import notice from './notice';
import segment from './segment';
import location from './location';
import user from './user';
import modal from './modal';

const rootReducer = combineReducers({
  main,
  summary,
  agency,
  notice,
  segment,
  location,
  user,
  modal,
  routing,
});

export default rootReducer;
