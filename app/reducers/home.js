import {
  REQUEST_USERS_METRICS,
  REQUEST_DATABASE_METRICS,
  REQUEST_PLIVO_DATA,
  RECEIVE_USERS_METRICS,
  RECEIVE_DATABASE_METRICS,
  RECEIVE_PLIVO_DATA,
} from '../constants/ActionTypes';

const initialState = {
  database: {
    isFetching: false,
    numBiddings: 0,
    numAgencies: 0,
    numSegments: 0,
    numLocations: 0,
  },
  users: {
    isFetching: false,
    total: 0,
    numBasics: 0,
    numPremiums: 0,
    numDefaults: 0,
    numToday: 0,
  },
  plivo: {
    isFetching: false,
    credits: 0,
  },
}

const home = (state = initialState, action) => {
  switch(action.type) {

    case REQUEST_DATABASE_METRICS:
      return {
        ...state,
        database: {
          ...state.database,
          isFetching: true,  
        }
      }
  
    case RECEIVE_DATABASE_METRICS:
      return {
        ...state,
        database: {
          ...state.database,
          isFetching: false,
          ...action.metrics,
        }
      }

    case REQUEST_USERS_METRICS:
      return {
        ...state,
        users: {
          ...state.users,
          isFetching: true,
        }
      }
      
    case RECEIVE_USERS_METRICS:
      return {
        ...state,
        users: {
          ...state.users,
          isFetching: false,
          numDefaults: action.numDefaults,
          numPremiums: action.numPremiums,
          numToday: action.numToday,
          numBasics: action.numBasics,
          total: action.total,
        }
      }
      
    case REQUEST_PLIVO_DATA:
      return {
        ...state,
        plivo: {
          ...state.plivo,
          isFetching: true
        }
      }
      
    case RECEIVE_PLIVO_DATA:
      return {
        ...state,
        plivo: {
          ...state.plivo,
          isFetching: false,
          credits: action.credits,
        }
      }

    default:
      return state;
  }
}

export default home;