
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
  SEARCH_NOTICE_SELECTED_CHANGE,

  EDIT_NOTICE_SET,
  
} from '../constants/ActionTypes';

const insertInitialState = {
  isSearchingAgencies: false,
  agencies: [],
  notice: {
    modality: -1,
    number: '',
    segmentId: '',
    agencyId: '',
    amount: 0,
    object: '',
    exclusive: false,
    date: '', 
  }
};

const searchInitialState = {
  isFiltering: false,
  sort: 'data',
  selected: {},
  pagination: {
    current: 0
  },
  filter: {
    modality: -1,
    number: '',
    agencyId: '',
    segmentId: '',
    amount: -1,
    object: '',
    startDate: '',
    endDate: '',
  },
}

const editInitialState = {
  notice: {
    original: {},
    edited: {},
  }
}

const initialState = {
  list: [],
  numNotices: 0,
  action: 'search',
  isFetching: false,
  isFetchingCount: false,
  insert: insertInitialState,
  search: searchInitialState,
  edit: editInitialState,
};

const insert = (state = insertInitialState, action) => {
  switch(action.type) {
    case INSERT_NOTICE_REQUEST_AGENCY_SEARCH:
      return {
        ...state,
        insert: {
          ...state.insert,
          isSearchingAgencies: true,
        }
      }

    case INSERT_NOTICE_RECEIVE_AGENCY_SEARCH:
      return {
        ...state,
        insert: {
          ...state.insert,
          agencies: action.agencies,
          isSearchingAgencies: false,
        }
      }

    case INSERT_NOTICE_AGENCY_SEARCH_CLEAR:
      return {
        ...state,
        insert: {
          ...state.insert,
          agencies: [],
          isSearchingAgencies: false,
        }
      }
  }
}

const search = (state = searchInitialState, action) => {
  switch(action.type) {
    case SEARCH_NOTICE_FILTER_CHANGE:
    {
      const filter = { ...state.search.filter };
      filter[action.filter.property] = action.filter.value;   
      return {
        ...state,
        search: {
          ...state.search,
          filter: filter,
        }
      }
    }

    case SEARCH_NOTICE_FILTER_APPLY:
      return {
        ...state,
        search: {
          ...state.search,
          isFiltering: true,
        }
      }

    case SEARCH_NOTICE_FILTER_CLEAR:
      return {
        ...state,
        search: {
          ...state.search,
          filter: searchInitialState.filter,
          isFiltering: false,
        }
      }

    case SEARCH_NOTICE_PAGINATION_CHANGE:
      return {
        ...state,
        search: {
          ...state.search,
          pagination: action.pagination,
        }
      }

    case SEARCH_NOTICE_SELECTED_CHANGE:
      return {
        ...state,
        search: {
          ...state.search,
          selected: action.selected,
        }
      }
  }
}

const edit = (state = editInitialState, action) => {
  switch(action.type) {
    case EDIT_NOTICE_SET:
      return {
        ...state,
        edit: {
          ...state.edit,
          notice: {
            ...state.edit.notice,
            original: action.notice,
            edited: action.notice,
          }
        }
      }
  }
}

const notice = (state = initialState, action) => {
  switch(action.type) {

    case NOTICE_ACTION_CHANGE:
      return {
        ...state,
        action: action.action,
      }

    case REQUEST_NOTICES:
      return {
        ...state,
        isFetching: true,
      }

    case RECEIVE_NOTICES:
      return {
        ...state,
        list: action.notices,
        numNotices: action.notices.length,
        isFetching: false,
      }

    case INSERT_NOTICE_REQUEST_AGENCY_SEARCH:
    case INSERT_NOTICE_RECEIVE_AGENCY_SEARCH:
    case INSERT_NOTICE_AGENCY_SEARCH_CLEAR:
      return insert(state, action);
      
    case SEARCH_NOTICE_FILTER_CHANGE:
    case SEARCH_NOTICE_FILTER_APPLY:
    case SEARCH_NOTICE_FILTER_CLEAR:
    case SEARCH_NOTICE_PAGINATION_CHANGE:
    case SEARCH_NOTICE_SELECTED_CHANGE:
      return search(state, action);

    case EDIT_NOTICE_SET:
      return edit(state, action);
      
    default:
      return state;
  }
}

export default notice;