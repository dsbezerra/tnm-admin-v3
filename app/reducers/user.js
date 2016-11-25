import {
  REQUEST_USERS,
  RECEIVE_USERS,
  REQUEST_USERS_COUNT,
  RECEIVE_USERS_COUNT,
  REQUEST_NEWEST_USERS,
  RECEIVE_NEWEST_USERS,
  USERS_SELECT_CHANGE,
  USERS_ALL_VIEW_STYLE_CHANGE,
  USERS_ALL_SORT_CHANGE,
  USERS_ALL_FILTER_CHANGE,
  USERS_ALL_FILTER_CLEAR,
  USERS_ALL_LIMIT_CHANGE,
} from '../constants/ActionTypes';

const initialState = {

  newest: {
    isFetching: false,
    list: [],
    numUsers: 0,
  },
  
  list: [],
  numUsers: 0,
  isFetching: false,
  isFetchingCount: false,

  sort: {
    property: 'activationDate',
    order: 'DESC',
  },
  allViewStyle: 'table' /* Possible: table, grid */,

  limit: 10,
  filter: {},
  selected: {}
};

const user = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_USERS:
      return {
        ...state,
        isFetching: true,
      }

    case RECEIVE_USERS:
      return {
        ...state,
        isFetching: false,
        list: action.users,
      }

    case REQUEST_USERS_COUNT:
      return {
        ...state,
        isFetchingCount: true,
      }
      
    case RECEIVE_USERS_COUNT:
      return {
        ...state,
        numUsers: action.count,
        isFetchingCount: false,
      }

    case REQUEST_NEWEST_USERS:
      return {
        ...state,
        newest: {
          ...state.newest,
          isFetching: true,
        }
      }
      
    case RECEIVE_NEWEST_USERS:
      return {
        ...state,
        newest: {
          ...state.newest,
          isFetching: false,
          list: action.users,
          numUsers: action.users.length,
        }
      }

    case USERS_SELECT_CHANGE:
      return {
        ...state,
        selected: action.user,
      }
      
    case USERS_ALL_VIEW_STYLE_CHANGE:
      return {
        ...state,
        allViewStyle: action.viewStyle,
      }

    case USERS_ALL_SORT_CHANGE:
      return {
        ...state,
        sort: action.sort,
      }

    case USERS_ALL_FILTER_CHANGE:
    {
      const filter = { ...state.filter };
      filter[action.filter.property] = action.filter.value;
      
      return {
        ...state,
        filter: filter, 
      }
    }

    case USERS_ALL_FILTER_CLEAR:
      return {
        ...state,
        filter: {}
      }

    case USERS_ALL_LIMIT_CHANGE:
      return {
        ...state,
        limit: action.limit,
      }
      
    default:
      return state;
  }
}

export default user;