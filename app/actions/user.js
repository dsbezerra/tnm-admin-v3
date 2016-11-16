import fetch from 'isomorphic-fetch';

import * as StorageUtils from '../utils/StorageUtils';

import {
  UPDATE_USERNAME,
  REQUEST_LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESSFUL,
  REQUEST_LOGOUT,
  LOGOUT_SUCCESSFUL,
  LOGOUT_FAILURE,
} from '../constants/ActionTypes';

/* Request Login action to  notify reducer for UI updates */
export function requestLogin() {
  return {
    type: REQUEST_LOGIN,
  }
}

/* Handles login success */ 
export function loginSuccessful(user) {
  return {
    type: LOGIN_SUCCESSFUL,
    user,
  }
}

/* Handles login failure */
export function loginFailure() {
  return {
    type: LOGIN_FAILURE,
  }
}

export function requestLogout() {
  return {
    type: REQUEST_LOGOUT,
  }
}

/* Logouts the user */
export function logoutSuccessful() {
  return {
    type: LOGOUT_SUCCESSFUL,
  }
}

export function logoutFailure() {
  return {
    type: LOGOUT_FAILURE,
  }
}

export function updateUsername(username) {
  return {
    type: UPDATE_USERNAME,
    username
  }
}

/* Start login request */
export function login(email, password, router) {
  return function (dispatch) {
    // Dispatch requestLogin so the UI displays a Spinner
    dispatch(requestLogin());
    const body = { email: email, password: password, };
    return fetch('/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include'
    })
    .then(response => response.json())
    .then(json => {
      if(json.success) {

        StorageUtils.setItem('username', json.data.userId);
        
        dispatch(loginSuccessful(json.data));
        router.push('/dashboard');
      }
      else if(json.statusCode !== 200) {
        dispatch(loginFailure());
      }
    });
  }
}

export function logout(router) {
  return function(dispatch) {
    dispatch(requestLogout());

    return fetch('/logout', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then(response => response.json())
    .then(json => {
      if(json.success) {

        setTimeout(() => {
          dispatch(logoutSuccessful());
          router.replace('/login');
        }, 2000);
      }
      else {
        dispatch(logoutFailure());
      }
    })
  }
}