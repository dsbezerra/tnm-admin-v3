import fetch from 'isomorphic-fetch';

import {
  SEGMENT_ACTION_CHANGE,
  REQUEST_INSERT_SEGMENT,
  INSERT_SEGMENT,
  INSERT_SEGMENT_SUCCESS,
  INSERT_SEGMENT_FAIL,
  INSERT_SEGMENT_CLEAR,
  INSERT_SEGMENT_NAME_CHANGE,
  EDIT_SEGMENT,
  EDIT_SEGMENT_SET,
  EDIT_SEGMENT_NAME_CHANGE,
  DELETE_SEGMENT,
  REQUEST_SEGMENTS,
  REQUEST_SEGMENTS_COUNT,
  RECEIVE_SEGMENTS,
  RECEIVE_SEGMENTS_COUNT,
  SEARCH_SEGMENT_FILTER_CHANGE,
  SEARCH_SEGMENT_VIEW_STYLE_CHANGE,
} from '../constants/ActionTypes';

export function requestInsertSegment() {
  return {
    type: REQUEST_INSERT_SEGMENT,
  }
}

export function insertSegmentSuccess() {
  return {
    type: INSERT_SEGMENT_SUCCESS,
  }
}

/**
 * Triggered when the user types in the input field of insert segment
 */
export function onUpdateInsertName(value) {
  return {
    type: INSERT_SEGMENT_NAME_CHANGE,
    value,
  }
}

/**
 * Triggered when the user types in the segment filter box
 */
export function onUpdateFilter(value) {
  return {
    type: SEARCH_SEGMENT_FILTER_CHANGE,
    value,
  }
}

export function onUpdateEditName(value) {
  return {
    type: EDIT_SEGMENT_NAME_CHANGE,
    value,
  }
}

export function onInsertClear() {
  return {
    type: INSERT_SEGMENT_CLEAR,
  }
}

export function onUpdateAction(action) {
  return {
    type: SEGMENT_ACTION_CHANGE,
    action,
  }
}

export function editSegmentSet(segment) {
  return {
    type: EDIT_SEGMENT_SET,
    segment,
  }
}

// Triggered when the user clicks in one of the two view styles (SearchSegment)
export function onUpdateViewStyle(viewStyle) {
  return {
    type: SEARCH_SEGMENT_VIEW_STYLE_CHANGE,
    viewStyle,
  }
}

/**
 * Triggered when user click edit segment
 */
export function editSegment(segment) {
  return {
    type: EDIT_SEGMENT,
    segment,
  }
}

/**
 * Triggered when user click delete segment
 */
export function deleteSegment(segment) {
  return {
    type: DELETE_SEGMENT,
    segment,
  }
}

/**
 * Sets isFetching (segment) to true, so the UI can display a loading spinner
 */
export function requestSegments() {
  return {
    type: REQUEST_SEGMENTS,
  }
}

/**
 * Handles the received response in JSON
 * @param json object JSON response with segments array
 */
export function receiveSegments(segments) {
  return {
    type: RECEIVE_SEGMENTS,
    segments: segments,
  }
}

export function requestSegmentsCount() {
  return {
    type: REQUEST_SEGMENTS_COUNT,
  }
}

export function receiveSegmentsCount(count) {
  return {
    type: RECEIVE_SEGMENTS_COUNT,
    count
  }
}

/* Fetch all segments from database */
export function fetchSegments(filter) {
  return function (dispatch) {

    // Dispatch requestSegments so the UI displays a Spinner
    dispatch(requestSegments());

    
    let url = '/segments';
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
      dispatch(receiveSegments(json.data))
    });
  }
}

/* Fetch a segment from id */
export function fetchSegmentById(id) {
  return function (dispatch) {    
    return fetch('/segments/' + id, {
      method: 'GET',
      credentials: 'include',
    })
    .then(response => response.json())
    .then(json => {
      // Update state with received data
      dispatch(editSegmentSet(json.data))
    });
  }
}

export function fetchSegmentsCount(filter) {
  return function (dispatch) {

    // Dispatch requestSegments so the UI displays a Spinner
    dispatch(requestSegmentsCount());

    let url = '/segments/count'
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
      dispatch(receiveSegmentsCount(json.data.count))
    });
  }
}

/**
 * Triggered when user inserts a segment
 */
export function insertSegment(segment) {
  return function(dispatch) {
    dispatch(requestInsertSegment());
    
    setTimeout(() => {
      dispatch(insertSegmentSuccess());
    }, 2000);
  }
}