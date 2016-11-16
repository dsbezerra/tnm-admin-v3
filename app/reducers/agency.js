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
  RECEIVE_AGENCIES,
  RECEIVE_AGENCIES_COUNT,
  REQUEST_AGENCIES,
  REQUEST_AGENCIES_COUNT,
} from '../constants/ActionTypes';

const insertInitialState = {
  initials: '',
  name: '',
  cityId: '',
}

const searchInitialState = {
  sort: 'sigla',
  pagination: {
    current: 0,
  }
}

const editInitialState = {
  agency: {
    original: {},
    edited: {},
  }
}

const initialState = {
  agencies: [],
  numAgencies: 0,
  action: 'insert',
  isFetching: false,
  isFetchingCount: false,
  insert: insertInitialState,
  edit: editInitialState,
  search: searchInitialState,
}

const insert = (state = insertInitialState, action) => {
  switch(action.type) {
    case INSERT_AGENCY_CLEAR:
      return {
        ...state,
        insert: insertInitialState
      }

    case INSERT_AGENCY_CITY_CHANGE:
      return {
        ...state,
        insert: {
          ...state.insert,
          cityId: action.city.id
        }
      }

    case INSERT_AGENCY_INITIALS_CHANGE:
      return {
        ...state,
        insert: {
          ...state.insert,
          initials: action.initials
        }
      }

    case INSERT_AGENCY_NAME_CHANGE:
      return {
        ...state,
        insert: {
          ...state.insert,
          name: action.name
        }
      }
  }
}

const search = (state = searchInitialState, action) => {
  switch(action.type) {
    case SEARCH_AGENCY_SORT_CHANGE:
      return {
        ...state,
        search: {
          ...state.search,
          sort: action.sort
        }
      }

    case SEARCH_AGENCY_PAGINATION_CHANGE:
      return {
        ...state,
        search: {
          ...state.search,
          pagination: action.pagination
        }
      }
  }
}

const edit = (state = editInitialState, action) => {
  switch(action.type) {
    case EDIT_AGENCY_SET:
      return {
        ...state,
        edit: {
          ...state.edit,
          agency: {
            ...state.edit.agency,
            original: action.agency,
            edited: {
              name: action.agency.nome,
              initials: action.agency.sigla,
              cityId: action.agency.cidadeId 
            }
          }
        }
      }

    case EDIT_AGENCY_INITIALS_CHANGE:
    {
      const agency = { ...state.edit.agency };
      return {
        ...state,
        edit: {
          ...state.edit,
          agency: {
            ...agency,
            edited: {
              ...agency.edited,
              initials: action.initials,
            }
          }
        }
      }
    }
      
    case EDIT_AGENCY_NAME_CHANGE:
    {
      const agency = { ...state.edit.agency };
      return {
        ...state,
        edit: {
          ...state.edit,
          agency: {
            ...agency,
            edited: {
              ...agency.edited,
              name: action.name,
            }
          }
        }
      }
    }
      
    case EDIT_AGENCY_CITY_CHANGE:
    {
      const agency = { ...state.edit.agency };
      return {
        ...state,
        edit: {
          ...state.edit,
          agency: {
            ...agency,
            edited: {
              ...agency.edited,
              cityId: action.city.id,
            }
          }
        }
      }
    }
  }
}

const agency = (state = initialState, action) => {
  switch(action.type) {

    case REQUEST_AGENCIES:
      return {
        ...state,
        isFetching: true
      }

    case RECEIVE_AGENCIES:
      return {
        ...state,
        agencies: action.agencies,
        numAgencies: action.agencies.length,
        isFetching: false,
      }

    case REQUEST_AGENCIES_COUNT:
      return {
        ...state,
        isFetchingCount: true,
      }
      
    case RECEIVE_AGENCIES_COUNT:
      return {
        ...state,
        isFetchingCount: false,
        numAgencies: action.count
      }
      
    case AGENCY_ACTION_CHANGE:
      return {
        ...state,
        action: action.action,
      }

    case INSERT_AGENCY_CLEAR:
    case INSERT_AGENCY_CITY_CHANGE:
    case INSERT_AGENCY_INITIALS_CHANGE:
    case INSERT_AGENCY_NAME_CHANGE:
      return insert(state, action);

    case EDIT_AGENCY_SET:
    case EDIT_AGENCY_INITIALS_CHANGE:
    case EDIT_AGENCY_NAME_CHANGE:
    case EDIT_AGENCY_CITY_CHANGE:
      return edit(state, action);
      
    case SEARCH_AGENCY_SORT_CHANGE:
    case SEARCH_AGENCY_PAGINATION_CHANGE:
      return search(state, action);
      
    default:
      return state;
  }
}

export default agency;