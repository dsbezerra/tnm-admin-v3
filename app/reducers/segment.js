import _ from 'lodash';

import {
  SEGMENT_ACTION_CHANGE,
  REQUEST_INSERT_SEGMENT,
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

const insertInitialState = {
  isInserting: false,
  name: '',
  errors: [],
}

const searchInitialState = {
  filterText: '',
  viewStyle: 'grid',
}

const editInitialState = {
  segment: {
    original: {},
    edited: {},
  },
}

const initialState = {
  list: [],
  numSegments: 0,
  isFetching: false,
  isFetchingCount: false,
  action: 'search',
  insert: insertInitialState,
  search: searchInitialState,
  edit: editInitialState,
};

const insert = (state = insertInitialState, action) => {
  switch(action.type) {

    case REQUEST_INSERT_SEGMENT:
      {
        return {
          ...state,
          insert: {
            ...state.insert,
            isInserting: true,
            errors: [],
          }
        }
      }

    case INSERT_SEGMENT_SUCCESS:
      {
        return {
          ...state,
          insert: insertInitialState,
        }
      }

    case INSERT_SEGMENT_FAIL:
      {
        return {
          ...state,
          insert: {
            ...state.insert,
            isInserting: false,
            errors: action.errors
          },
        }
      }
      
    case INSERT_SEGMENT_CLEAR:
      return {
        ...state,
        insert: insertInitialState,
      }

    case INSERT_SEGMENT_NAME_CHANGE:
      {
        return {
          ...state,
          insert: {
            ...state.insert,
            name: action.value,
          }
        }
      }
  }
}

const search = (state = searchInitialState, action) => {
  switch(action.type) {
    case SEARCH_SEGMENT_FILTER_CHANGE:
      {
        return {
          ...state,
          search: {
            ...state.search,
            filterText: action.value.toLowerCase()
          }
        }
      }

    case SEARCH_SEGMENT_VIEW_STYLE_CHANGE:
      {
        return {
          ...state,
          search: {
            ...state.search,
            viewStyle: action.viewStyle,
          }
        }
      }
  }
}

const edit = (state = editInitialState, action) => {
  switch(action.type) {
    case EDIT_SEGMENT_SET:
      {
        return {
          ...state,
          edit: {
            ...state.edit,
            segment: {
              ...state.edit.segment,
              original: action.segment,
              edited: action.segment,
            }
          }
        }
      }

    case EDIT_SEGMENT_NAME_CHANGE:
      {

        const segment = { ...state.edit.segment };
        
        return {
          ...state,
          edit: {
            ...state.edit,
            segment: {
              ...segment,
              edited: {
                ...segment.edited,
                descricao: action.value
              }
            }
          }
        }
        
      }
  }
}

const segment = (state = initialState, action) => {
  switch(action.type) {

    case REQUEST_INSERT_SEGMENT:
    case INSERT_SEGMENT_CLEAR:
    case INSERT_SEGMENT_SUCCESS:
    case INSERT_SEGMENT_FAIL:
    case INSERT_SEGMENT_NAME_CHANGE:
      return insert(state, action);

    case SEARCH_SEGMENT_VIEW_STYLE_CHANGE:
    case SEARCH_SEGMENT_FILTER_CHANGE:
      return search(state, action);

    case EDIT_SEGMENT_SET:
    case EDIT_SEGMENT_NAME_CHANGE:
      return edit(state, action);

    case SEGMENT_ACTION_CHANGE:
      return {
        ...state,
        action: action.action,
      }
      
    case REQUEST_SEGMENTS:
      return {
        ...state,
        isFetching: true,
      }
      
    case RECEIVE_SEGMENTS:
      return {
        ...state,
        list: action.segments,
        numSegments: action.segments.length,
        isFetching: false,
      }

    case REQUEST_SEGMENTS_COUNT:
      return {
        ...state,
        isFetchingCount: true,
      }

    case RECEIVE_SEGMENTS_COUNT:
      return {
        ...state,
        isFetchingCount: false,
        numSegments: action.count,
      }
      
    default:
      return state;
  }
}

export default segment;