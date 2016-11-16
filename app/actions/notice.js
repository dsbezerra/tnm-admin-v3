import {
  NOTICE_ACTION_CHANGE,

  REQUEST_NOTICES,
  REQUEST_NOTICES_COUNT,
  RECEIVE_NOTICES,
  RECEIVE_NOTICES_COUNT,

  INSERT_NOTICE_REQUEST_AGENCY_SEARCH,
  INSERT_NOTICE_RECEIVE_AGENCY_SEARCH,
  INSERT_NOTICE_AGENCY_SEARCH_CLEAR,
  
  SEARCH_NOTICE_FILTER_CHANGE,
  SEARCH_NOTICE_FILTER_APPLY,
  SEARCH_NOTICE_FILTER_CLEAR,
  SEARCH_NOTICE_PAGINATION_CHANGE,
  
} from '../constants/ActionTypes';

export function onUpdateAction(action) {
  return {
    type: NOTICE_ACTION_CHANGE,
    action,
  }
}

export function onSearchPaginationChange(pagination) {
  return {
    type: SEARCH_NOTICE_PAGINATION_CHANGE,
    pagination
  }
}

export function onUpdateSearchFilter(filter) {
  return {
    type: SEARCH_NOTICE_FILTER_CHANGE,
    filter,
  }
}

export function onApplyFilterSearch() {
  return {
    type: SEARCH_NOTICE_FILTER_APPLY,
  }
}

export function onClearSearchFilter() {
  return {
    type: SEARCH_NOTICE_FILTER_CLEAR,
  }
}

export function requestAgencySearch() {
  return {
    type: INSERT_NOTICE_REQUEST_AGENCY_SEARCH,
  }
}

export function receiveAgencySearch(agencies) {
  return {
    type: INSERT_NOTICE_RECEIVE_AGENCY_SEARCH,
    agencies,
  }
}

export function requestNotices() {
  return {
    type: REQUEST_NOTICES,
  }
}

export function receiveNotices(notices) {
  return {
    type: RECEIVE_NOTICES,
    notices,
  }
}

export function clearSearchAgencies() {
  return {
    type: INSERT_NOTICE_AGENCY_SEARCH_CLEAR,
  }
}

export function searchAgencies(filter) {
  return function(dispatch) {
    dispatch(requestAgencySearch());

    let url = '/agencies';
    if(filter) {
      url += '?filter=' + JSON.stringify(filter);
    }

    return fetch(url, {
      method: 'GET',
      credentials: 'include',
    })
    .then(response => response.json())
    .then(json => {
      if(json.success) {
        dispatch(receiveAgencySearch(json.data));
      }
      else {
        dispatch(receiveAgencySearch([]));
      }
    });
  }
}

export function fetchNotices(filter) {
  return function (dispatch) {

    // Dispatch requestSegments so the UI displays a Spinner
    dispatch(requestNotices());
    
    let url = '/notices'
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
      dispatch(receiveNotices(json.data))
    });
  }
}