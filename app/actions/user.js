import fetch from 'isomorphic-fetch';

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

export function requestUsers() {
  return {
    type: REQUEST_USERS,
  }
}

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function requestUsersCount() {
  return {
    type: REQUEST_USERS_COUNT,
  }
}

export function receiveUsersCount(count) {
  return {
    type: RECEIVE_USERS_COUNT,
    count
  }
}

export function requestNewestUsers() {
  return {
    type: REQUEST_NEWEST_USERS,
  }
}

export function receiveNewestUsers(users) {
  return {
    type: RECEIVE_NEWEST_USERS,
    users
  }
}

export function onUsersSelectChange(user) {
  return {
    type: USERS_SELECT_CHANGE,
    user,
  }
}

export function onAllViewStyleChange(viewStyle) {
  return {
    type: USERS_ALL_VIEW_STYLE_CHANGE,
    viewStyle
  }
}

export function onAllSortChange(sort) {
  return {
    type: USERS_ALL_SORT_CHANGE,
    sort,
  }
}

export function onAllFilterChange(filter) {
  return {
    type: USERS_ALL_FILTER_CHANGE,
    filter,
  }
}

export function onAllFilterClear() {
  return {
    type: USERS_ALL_FILTER_CLEAR,
  }
}

export function onAllLimitChange(limit) {
  return {
    type: USERS_ALL_LIMIT_CHANGE,
    limit,
  }
}

export function fetchUsers(filter) {
  return function (dispatch) {

    dispatch(requestUsers());

    let url = '/installations';
    if(filter) {
      url += '?filter=' + JSON.stringify(filter);
    }

    return fetch(url, {
      method: 'GET',
      credentials: 'include',
    })
    .then(response => response.json())
    .then(json => {
      dispatch(receiveUsers(json.data));
    });
  }
}

export function fetchUsersCount(filter) {
  return function (dispatch) {
    
    dispatch(requestUsersCount());

    let url = '/installations/count'
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
      dispatch(receiveUsersCount(json.data.count))
    });
  }
}

export function fetchNewestUsers(filter) {
  return function (dispatch) {
    dispatch(requestNewestUsers());

    let url = '/installations';
    if(filter) {
      url += '?filter=' + JSON.stringify(filter);
    }

    return fetch(url, {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(json => {
      dispatch(receiveNewestUsers(json.data));
    });
  }
}