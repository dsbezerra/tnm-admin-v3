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
    isLoaded: false,
    numBiddings: 0,
    numAgencies: 0,
    numSegments: 0,
    numLocations: 0,
  },
  users: {
    isFetching: false,
    isLoaded: false,
    total: 0,
    numBasics: 0,
    numPremiums: 0,
    numDefaults: 0,
    numTrials: 0,
    numToday: 0,
  },
  plivo: {
    isFetching: false,
    isLoaded: false,
    accountType: '',
    autoRecharge: false,
    timeZone: '',
    remainingCredits: 0,
  },
}

const summary = (state = initialState, action) => {
  switch(action.type) {

    case REQUEST_DATABASE_METRICS:
      return {
        ...state,
        database: {
          ...state.database,
          isFetching: true,
          isLoaded: false,
        }
      }
      
    case RECEIVE_DATABASE_METRICS:
      return {
        ...state,
        database: {
          ...state.database,
          isFetching: false,
          isLoaded: true,
          ...action.metrics,
        }
      }

    case REQUEST_USERS_METRICS:
      return {
        ...state,
        users: {
          ...state.users,
          isFetching: true,
          isLoaded: false,
        }
      }
      
    case RECEIVE_USERS_METRICS:
      return {
        ...state,
        users: {
          ...state.users,
          isFetching: false,
          isLoaded: true,
          ...action.metrics,
        }
      }
      
    case REQUEST_PLIVO_DATA:
      return {
        ...state,
        plivo: {
          ...state.plivo,
          isFetching: true,
          isLoaded: false,
        }
      }
      
    case RECEIVE_PLIVO_DATA:
      return {
        ...state,
        plivo: {
          ...state.plivo,
          isFetching: false,
          isLoaded: true,
          ...action.data,
        }
      }

    default:
      return state;
  }
}

export default summary;