import {
  NOTICE_ACTION_CHANGE,
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