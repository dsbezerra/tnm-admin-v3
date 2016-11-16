import {
  REQUEST_USERS_METRICS,
  REQUEST_DATABASE_METRICS,
  REQUEST_PLIVO_DATA,
  RECEIVE_USERS_METRICS,
  RECEIVE_DATABASE_METRICS,
  RECEIVE_PLIVO_DATA,
} from '../constants/ActionTypes';

export function requestDatabaseMetrics() {
  return {
    type: REQUEST_DATABASE_METRICS,
  }
}

export function receiveDatabaseMetrics(metrics) {
  return {
    type: RECEIVE_DATABASE_METRICS,
    metrics,
  }
}

export function requestUsersMetrics() {
  return {
    type: REQUEST_USERS_METRICS,
  }
}

export function receiveUsersMetrics(metrics) {
  return {
    type: RECEIVE_USERS_METRICS,
    metrics,
  }
}

export function requestPlivoData() {
  return {
    type: REQUEST_PLIVO_DATA,
  }
}

export function receivePlivoData(data) {
  return {
    type: RECEIVE_PLIVO_DATA,
    data,
  }
}

/* fetch functions */

export function fetchDatabaseMetrics() {
  return function (dispatch) {

    // Dispatch requestSegments so the UI displays a Spinner
    dispatch(requestDatabaseMetrics());

    return fetch('/metrics/database', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(json => {
        // Update state with received data
        dispatch(receiveDatabaseMetrics(json.data))
      });
  }
}

export function fetchUsersMetrics() {
  return function (dispatch) {

    // Dispatch requestSegments so the UI displays a Spinner
    dispatch(requestUsersMetrics());

    return fetch('/metrics/users', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(json => {
        // Update state with received data
        dispatch(receiveUsersMetrics(json.data))
      });
  }
}

export function fetchPlivoData() {
  return function (dispatch) {

    // Dispatch requestSegments so the UI displays a Spinner
    dispatch(requestPlivoData());

    return fetch('/plivo/account', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(json => {
        // Update state with received data
        dispatch(receivePlivoData(json.data))
      });
  }
}
