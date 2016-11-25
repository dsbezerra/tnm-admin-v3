import {
  UPDATE_USERNAME,
  REQUEST_LOGIN,
  REQUEST_LOGOUT,
  LOGIN_FAILURE,
  LOGIN_SUCCESSFUL,
  LOGOUT_SUCCESSFUL,
  LOGOUT_FAILURE,
} from '../constants/ActionTypes';

const initialState = {
  username: '',
  token: '',
  isLogging: false,
  isLoggedIn: false,
  isLoggingOut: false,
};

const admin = (state = initialState, action) => {
  switch(action.type) {

    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.username
      }
      
    case REQUEST_LOGIN:
      return {
        ...state,
        isLogging: true,
      }

    case REQUEST_LOGOUT:
      return {
        ...state,
        isLoggingOut: true,
      }
      
    case LOGIN_SUCCESSFUL:
      return {
        ...state,
        username: action.user.userId,
        token: action.user.id,
        isLoggedIn: true,
        isLogging: false,
      }

    case LOGIN_FAILURE:
      return {
        ...state,
        isLogging: false,
      }

    case LOGOUT_SUCCESSFUL:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingOut: false,
      }

    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
      }

    default:
      return state;
  }
}

export default admin;