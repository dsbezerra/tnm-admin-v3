import fetch from 'isomorphic-fetch';

import {
  LOCATION_ACTION_CHANGE,
  
  INSERT_LOCATION_CHANGE,
  INSERT_LOCATION,
  INSERT_LOCATION_SUCCESS,
  INSERT_LOCATION_FAIL,

  SEARCH_LOCATION_LIMIT_CHANGE,
  SEARCH_LOCATION_FILTER_CHANGE,
  SEARCH_LOCATION_FILTER_CLEAR,
  SEARCH_LOCATION_SORT_CHANGE,
  SEARCH_LOCATION_PAGE_CHANGE,
  
  REQUEST_INSERT_LOCATION,
  REQUEST_CITIES,
  REQUEST_CITIES_FROM_STATE,
  REQUEST_CITIES_COUNT,
  RECEIVE_CITIES,
  RECEIVE_CITIES_FROM_STATE,
  RECEIVE_CITIES_COUNT,
  
  REQUEST_STATES,
  RECEIVE_STATES,
} from '../constants/ActionTypes';

export function onChangeSort(sort) {
  return {
    type: SEARCH_LOCATION_SORT_CHANGE,
    sort,
  }
}

export function onChangePage(dir) {
  return {
    type: SEARCH_LOCATION_PAGE_CHANGE,
    dir,
  }
}

export function onUpdateAction(action) {
  return {
    type: LOCATION_ACTION_CHANGE,
    action,
  }
}

export function onUpdateSearchLimit(limit) {
  return {
    type: SEARCH_LOCATION_LIMIT_CHANGE,
    limit,
  }
}

export function onUpdateSearchFilter(filter) {
  return {
    type: SEARCH_LOCATION_FILTER_CHANGE,
    filter,
  }
}

export function onClearSearchFilter() {
  return {
    type: SEARCH_LOCATION_FILTER_CLEAR,
  }
}

export function onUpdateInsertLocation(location) {
  return {
    type: INSERT_LOCATION_CHANGE,
    location,
  }
}

export function onUpdateEditCity(city) {
  return {
    type: EDIT_CITY_CHANGE,
    city,
  }
}

export function onUpdateEditState(state) {
  return {
    type: EDIT_STATE_CHANGE,
    state,
  }
}

export function requestStates() {
  return {
    type: REQUEST_STATES,
  }
}

export function receiveStates(states) {
  return {
    type: RECEIVE_STATES,
    states,
  }
}

export function requestCities() {
  return {
    type: REQUEST_CITIES,
  }
}

export function receiveCities(cities) {
  return {
    type: RECEIVE_CITIES,
    cities,
  }
}

export function requestCitiesFromState() {
  return {
    type: REQUEST_CITIES_FROM_STATE,
  }
}

export function receiveCitiesFromState(cities) {
  return {
    type: RECEIVE_CITIES_FROM_STATE,
    cities,
  }
}

export function requestCitiesCount() {
  return {
    type: REQUEST_CITIES_COUNT
  }
}

export function receiveCitiesCount(count) {
  return {
    type: RECEIVE_CITIES_COUNT,
    count,
  }
}

export function requestInsertLocation() {
  return {
    type: REQUEST_INSERT_LOCATION,
  }
}

export function insertLocationSuccess() {
  return {
    type: INSERT_LOCATION_SUCCESS,
  }
}

export function insertLocationFail(errors) {
  return {
    type: INSERT_LOCATION_FAIL,
    errors,
  }
}

export function fetchStates(filter) {
  return function(dispatch) {

    dispatch(requestStates());

    const filterQuery = JSON.stringify(filter);
    
    // Build filter query if needded
    return fetch('/locations/states?filter=' + filterQuery, {
      method: 'GET',
      credentials: 'include',
    })
    .then(response => response.json())
    .then(json => {
      if(json.success) {
        dispatch(receiveStates(json.data));
      }
    });
  }
}

export function fetchCities(filter) {
  return function(dispatch) {
    dispatch(requestCities());

    const filterQuery = JSON.stringify(filter);

    return fetch('/locations/cities?filter=' + filterQuery, {
      method: 'GET',
      credentials: 'include',
    })
    .then(response => response.json())
    .then(json => {
      if(json.success) {
        dispatch(receiveCities(json.data));
      }
    });
  }
}

export function fetchCitiesFromState(id) {
  return function(dispatch) {

    dispatch(requestCitiesFromState());
    
    // Build filter query if needded
    return fetch('/locations/states/' + id + '/cities', {
      method: 'GET',
      credentials: 'include',
    })
    .then(response => response.json())
    .then(json => {
      if(json.success) {
        dispatch(receiveCitiesFromState(json.data));
      }
    });
  }
}

export function fetchCitiesCount() {
  return function(dispatch) {

    dispatch(requestCitiesCount());

    return fetch('/locations/cities/count', {
      method: 'GET',
      credentials: 'include',
    })
    .then(response => response.json())
    .then(json => {
      if(json.success) {
        dispatch(receiveCitiesCount(json.data.count));
      }
    });
  }
}

export function insertLocation(location) {
  return function(dispatch) {
    dispatch(requestInsertLocation());

    return fetch('/locations', {
      method: 'POST',
      body: location,
      credentials: 'include',
    })
    .then(response => response.json())
    .then(json => {
      if(json.success) {
        dispatch(insertLocationSuccess(json.data));
      }
      else {
        dispatch(insertLocationFail(json.message));
      }
    })
  }
}