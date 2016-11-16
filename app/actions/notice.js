import {
  NOTICE_ACTION_CHANGE,

  INSERT_NOTICE_REQUEST_AGENCY_SEARCH,
  INSERT_NOTICE_RECEIVE_AGENCY_SEARCH,
  INSERT_NOTICE_AGENCY_SEARCH_CLEAR,
  
  SEARCH_NOTICE_FILTER_CHANGE,
  SEARCH_NOTICE_FILTER_APPLY,
  SEARCH_NOTICE_FILTER_CLEAR,
} from '../constants/ActionTypes';

export function onUpdateAction(action) {
  return {
    type: NOTICE_ACTION_CHANGE,
    action,
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