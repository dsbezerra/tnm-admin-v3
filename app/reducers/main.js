import {
  TOGGLE_NAVBAR,
  TOGGLE_ADMIN_CONTEXT_MENU,
  CHANGE_PATH,
  CHANGE_TOPBAR_TITLE
} from '../constants/ActionTypes';

const initialState = {
  isNavbarVisible: false,
  isAdminContextMenuVisible: false,
  activePath: '/',
  topBarTitle: 'TáNaMão Licitações'
};

const main = (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_NAVBAR:
    {
      const { isNavbarVisible } = state;
      return {
        ...state,
        isNavbarVisible: !isNavbarVisible 
      }
    }

    case TOGGLE_ADMIN_CONTEXT_MENU:
    {
      const { isAdminContextMenuVisible } = state;
      return {
        ...state,
        isAdminContextMenuVisible: !isAdminContextMenuVisible
      }
    }
      
    case CHANGE_PATH:
      return {
        ...state,
        activePath: action.path
      }


    case CHANGE_TOPBAR_TITLE:
      return {
        ...state,
        topBarTitle: action.title
      }

    default:
      return state;
  }
}

export default main;