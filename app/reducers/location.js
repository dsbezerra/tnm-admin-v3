import {
  LOCATION_ACTION_CHANGE,
  INSERT_LOCATION_CHANGE,
  INSERT_LOCATION,
  INSERT_LOCATION_SUCCESS,
  INSERT_LOCATION_FAIL,
  SEARCH_LOCATION_SORT_CHANGE,
  REQUEST_INSERT_LOCATION,
  REQUEST_CITIES,
  REQUEST_CITIES_FROM_STATE,
  REQUEST_STATES,
  RECEIVE_CITIES,
  RECEIVE_CITIES_FROM_STATE,
  RECEIVE_STATES
} from '../constants/ActionTypes';

const cityInitialState = {
  list: [],
  numCities: 0,
  isFetching: false,
}

const stateInitialState = {
  list: [],
  numStates: 0,
  isFetching: false,
}

const insertInitialState = {
  isInserting: false,
  city: '',
  stateId: '',
  errors: [],
}

const editIntialState = {
  original: {},
  edited: {},
}

const searchInitialState = {
  sort: 'nome',
  filter: {
    show: 25,
    state: '',
  }
}

const initialState = {
  city: cityInitialState,
  state: stateInitialState,
  citiesFromState: [],
  action: 'search',
  isFetchingCitiesFromState: false,
  insert: insertInitialState,
  edit: editIntialState,
  search: searchInitialState,
}

const insert = (state = insertInitialState, action) => {
  switch(action.type) {
    case REQUEST_INSERT_LOCATION:
      return {
        ...state,
        insert: {
          ...state.insert,
          isInserting: true,
          errors: [],
        }
      }

    case INSERT_LOCATION_FAIL:
      return {
        ...state,
        insert: {
          ...state.insert,
          isInserting: false,
          errors: action.errors
        },
      }

    case INSERT_LOCATION_SUCCESS:
      return {
        ...state,
        insert: insertInitialState,
      }

    case INSERT_LOCATION_CHANGE:
      return {
        ...state,
        insert: {
          ...state.insert,
          city: action.location.city,
          stateId: action.location.state,
        }
      }   
  }
}

const edit = (state = editIntialState, action) => {

}

const search = (state = searchInitialState, action) => {
  switch(action.type) {
    case SEARCH_LOCATION_SORT_CHANGE:
      return {
        ...state,
        search: {
          ...state.search,
          sort: action.sort,
        }
      }
  }
}

const city = (state = cityInitialState, action) => {
  switch(action.type) {
    case REQUEST_CITIES:
      return {
        ...state,
        city: {
          ...state.city,
          isFetching: true,
        }
      }
      
    case RECEIVE_CITIES:
      return {
        ...state,
        city: {
          ...state.city,
          list: action.cities,
          numCities: action.cities.length,
          isFetching: false,
        }
      }
  }
}

const state = (reduxState = stateInitialState, action) => {
  switch(action.type) {
    case REQUEST_STATES:
      return {
        ...reduxState,
        state: {
          ...reduxState.state,
          isFetching: true,
        }
      }
      
    case RECEIVE_STATES:
      return {
        ...reduxState,
        state: {
          ...reduxState.state,
          list: action.states,
          numStates: action.states.length,
          isFetching: false,
        }
      }
  }
}

const location = (locationState = initialState, action) => {
  switch(action.type) {

    case INSERT_LOCATION:
    case INSERT_LOCATION_CHANGE:
    case INSERT_LOCATION_SUCCESS:
    case INSERT_LOCATION_FAIL:
    case REQUEST_INSERT_LOCATION:
      return insert(locationState, action);

    case SEARCH_LOCATION_SORT_CHANGE:
      return search(locationState, action);
    
    case LOCATION_ACTION_CHANGE:
      return {
        ...locationState,
        action: action.action
      }

    case REQUEST_CITIES:
    case RECEIVE_CITIES:
      return city(locationState, action);

    case REQUEST_STATES:
    case RECEIVE_STATES:
      return state(locationState, action);

    case REQUEST_CITIES_FROM_STATE:
      return {
        ...locationState,
        isFetchingCitiesFromState: true,
      }
      
    case RECEIVE_CITIES_FROM_STATE:
      return {
        ...locationState,
        isFetchingCitiesFromState: false,
        citiesFromState: action.cities,
      }

    default:
      return locationState;
  }
}

export default location;