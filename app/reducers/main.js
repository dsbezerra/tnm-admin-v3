import {
  TOGGLE_NAVBAR,
  CHANGE_PATH,
  CHANGE_TOPBAR_TITLE
} from '../constants/ActionTypes';

const initialState = {
  isNavbarVisible: false,
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