import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux'

import main from './main';
import summary from './summary';

import admin from './admin';
import agency from './agency';
import notice from './notice';
import segment from './segment';
import location from './location';
import user from './user';
import tools from './tools';

import modal from './modal';

const rootReducer = combineReducers({
  main,
  summary,
  admin,
  agency,
  notice,
  segment,
  location,
  user,
  tools,
  modal,
  routing,
});

export default rootReducer;
