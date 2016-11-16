import {
  SHOW_MODAL,
  SHOW_MODAL_WITH_COMPONENT,
  HIDE_MODAL,
  CLOSE_MODAL,
  SET_MODAL,
  SET_MODAL_TEXT,
  SET_MODAL_TITLE,
  RESET_MODAL
} from '../constants/ActionTypes';

import * as DOMUtils from '../utils/DOMUtils';

const initialState = {
  title: '',
  text: '',
  component: {},
  buttons: [],
  visible: false,
}

const modal = (state = initialState, action) => {
  switch(action.type) {
    case SHOW_MODAL:
      DOMUtils.disableScrollFrom('html');
      return {
        ...state,
        visible: true,
      }

    case SHOW_MODAL_WITH_COMPONENT:
      DOMUtils.disableScrollFrom('html');
      return {
        ...state,
        component: action.component,
        visible: true,
      }
      
    case HIDE_MODAL:
      setTimeout(() => {
        DOMUtils.enableScrollFrom('html');
      }, 400); 
      
      return {
        ...state,
        visible: false,
      }

    case CLOSE_MODAL:
      setTimeout(() => {
        DOMUtils.enableScrollFrom('html');
      }, 400);
      
      return {
        ...initialState
      }

    case SET_MODAL_TITLE:
      return {
        ...state,
        title: action.title,
      }

    case SET_MODAL_TEXT:
      return {
        ...state,
        text: action.text,
      }

    case RESET_MODAL:
      return {
        ...initialState
      }
      
    default:
      return state;
  }
}

export default modal;