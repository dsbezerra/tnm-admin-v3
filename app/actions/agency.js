import {
  AGENCY_ACTION_CHANGE,
  INSERT_AGENCY_CLEAR,
  INSERT_AGENCY_CITY_CHANGE,
  INSERT_AGENCY_INITIALS_CHANGE,
  INSERT_AGENCY_NAME_CHANGE,
  EDIT_AGENCY,
  EDIT_AGENCY_SET,
  EDIT_AGENCY_NAME_CHANGE,
  EDIT_AGENCY_INITIALS_CHANGE,
  EDIT_AGENCY_CITY_CHANGE,
  SEARCH_AGENCY_SORT_CHANGE,
  SEARCH_AGENCY_PAGINATION_CHANGE,
  REQUEST_AGENCIES,
  REQUEST_AGENCIES_COUNT,
  RECEIVE_AGENCIES,
  RECEIVE_AGENCIES_COUNT,
} from '../constants/ActionTypes';

export function searchSortChange(sort) {
  return {
    type: SEARCH_AGENCY_SORT_CHANGE,
    sort,
  }
}

export function onPaginationChange(pagination) {
  return {
    type: SEARCH_AGENCY_PAGINATION_CHANGE,
    pagination
  }
}

export function editAgencySet(agency) {
  return {
    type: EDIT_AGENCY_SET,
    agency,
  }
}

export function onEditUpdateInitials(initials) {
  return {
    type: EDIT_AGENCY_INITIALS_CHANGE,
    initials,
  }
}

export function onEditUpdateName(name) {
  return {
    type: EDIT_AGENCY_NAME_CHANGE,
    name
  }
}

export function onEditUpdateCity(city) {
  return {
    type: EDIT_AGENCY_CITY_CHANGE,
    city,
  }
}

export function onUpdateAction(action) {
  return {
    type: AGENCY_ACTION_CHANGE,
    action,
  }
}

export function requestAgencies() {
  return {
    type: REQUEST_AGENCIES,
  }
}

export function receiveAgencies(agencies) {
  return {
    type: RECEIVE_AGENCIES,
    agencies
  }
}

export function requestAgenciesCount() {
  return {
    type: REQUEST_AGENCIES_COUNT,
  }
}

export function receiveAgenciesCount(count) {
  return {
    type: RECEIVE_AGENCIES_COUNT,
    count
  }
}

export function onClear() {
  return {
    type: INSERT_AGENCY_CLEAR
  }
}

export function onUpdateCity(city) {
  return {
    type: INSERT_AGENCY_CITY_CHANGE,
    city
  }
}

export function onUpdateInitials(initials) {
  return {
    type: INSERT_AGENCY_INITIALS_CHANGE,
    initials
  }
}

export function onUpdateName(name) {
  return {
    type: INSERT_AGENCY_NAME_CHANGE,
    name
  }
}

export function fetchAgencies(filter) {
  return function(dispatch) {

    dispatch(requestAgencies());

    const filterQuery = JSON.stringify(filter);

    return fetch('/agencies?filter=' + filterQuery, {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(json => {
      if(json.success) {
        dispatch(receiveAgencies(json.data));
      }
    });
  }
}

/* Fetch an agency from id */
export function fetchAgencyById(id, filter) {
  return function (dispatch) {

    let url = '/agencies/' + id;

    if(filter) {
      url += ('?filter=' + JSON.stringify(filter));
    }
    
    return fetch(url, {
      method: 'GET',
      credentials: 'include',
    })
    .then(response => response.json())
    .then(json => {
      // Update state with received data
      dispatch(editAgencySet(json.data))
    });
  }
}


export function fetchAgenciesCount(filter) {
  return function (dispatch) {

    // Dispatch requestSegments so the UI displays a Spinner
    dispatch(requestAgenciesCount());

    let url = '/agencies/count'
    if(filter) {
      url += '?filter=' + JSON.stringify(filter);
    }

    return fetch(url, {
      method: 'GET',
      credentials: 'include',
    })
    .then(response => response.json())
    .then(json => {
      // Update state with received data
        dispatch(receiveAgenciesCount(json.data.count))
    });
  }
}