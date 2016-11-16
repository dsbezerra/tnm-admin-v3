
import {
  NOTICE_ACTION_CHANGE,
  SEARCH_NOTICE_FILTER_CHANGE,
  SEARCH_NOTICE_FILTER_APPLY,
  SEARCH_NOTICE_FILTER_CLEAR,
} from '../constants/ActionTypes';

const insertInitialState = {
  modality: -1,
  number: '',
  segmentId: '',
  agencyId: '',
  amount: 0,
  object: '',
  exclusive: false,
  date: '',  
};

const searchInitialState = {
  isFiltering: false,
  filter: {
    modality: -1,
    number: '',
    agencyId: '',
    segmentId: '',
    amount: -1,
    object: '',
    startDate: '',
    endDate: '',
  }
}

const initialState = {
  notices: [],
  numNotices: 0,
  action: 'insert',
  isFetching: false,
  isFetchingCount: false,
  insert: insertInitialState,
  search: searchInitialState,
};

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
  }
}

const notice = (state = initialState, action) => {
  switch(action.type) {

    case NOTICE_ACTION_CHANGE:
      return {
        ...state,
        action: action.action,
      }

    case SEARCH_NOTICE_FILTER_CHANGE:
    case SEARCH_NOTICE_FILTER_APPLY:
    case SEARCH_NOTICE_FILTER_CLEAR:
      return search(state, action);
      
    default:
      return state;
  }
}

export default notice;