import { normalize, Schema, arrayOf } from 'normalizr';

import {

  SCRAPER_ACTION_CHANGE,
  SCRAPER_PAGE_CHANGE,
  
  SCRAPER_TOGGLE_BAR_VISIBILITY,
  SCRAPER_TOGGLE_BAR_EXPAND,
  SCRAPER_SELECT_CHANGE,
  SCRAPER_REQUEST_RUN,
  SCRAPER_RECEIVE_RUN,
  SCRAPER_START,
  SCRAPER_FINISH,
  SCRAPER_UPDATE_STATS,
  SCRAPER_REQUEST_LAST_RUN_SCRAPERS,
  SCRAPER_RECEIVE_LAST_RUN_SCRAPERS,
  SCRAPER_REQUEST_PENDING_RESULTS,
  SCRAPER_RECEIVE_PENDING_RESULTS,
  SCRAPER_RESULTS_SHOW_IGNORE_CHANGE,

  SCRAPER_RESULT_REQUEST_DETECT_SEGMENT,
  SCRAPER_RESULT_RECEIVE_DETECT_SEGMENT,
  SCRAPER_RESULT_CHANGE_SEGMENT,
  SCRAPER_RESULT_UPDATE_SEGMENT,
  SCRAPER_RESULT_CHANGE_SEGMENT_CONFIRM,
  SCRAPER_RESULT_CHANGE_SEGMENT_CANCEL,

  SCRAPER_RESULT_CHANGE_AMOUNT,
  SCRAPER_RESULT_UPDATE_AMOUNT,
  SCRAPER_RESULT_CHANGE_AMOUNT_CONFIRM,
  SCRAPER_RESULT_CHANGE_AMOUNT_CANCEL,

  SCRAPER_RESULT_UPDATE_IGNORE,
} from '../constants/ActionTypes';

export function onUpdateAction(action) {
  return {
    type: SCRAPER_ACTION_CHANGE,
    action,
  }
}

export function onChangePage(dir) {
  return {
    type: SCRAPER_PAGE_CHANGE,
    dir,
  }
}

export function onToggleBarVisibility() {
  return {
    type: SCRAPER_TOGGLE_BAR_VISIBILITY,
  }
}

export function onToggleBarExpand() {
  return {
    type: SCRAPER_TOGGLE_BAR_EXPAND,
  }
}

export function onSelectChange(selected) {
  return {
    type: SCRAPER_SELECT_CHANGE,
    selected,
  }
}

export function onScraperStart(scraper) {
  return {
    type: SCRAPER_START,
    scraper,
  }
}

export function onScraperFinish(id) {
  return {
    type: SCRAPER_FINISH,
    id,
  }
}

export function onScraperUpdateStats(data) {
  return {
    type: SCRAPER_UPDATE_STATS,
    data,
  }
}

export function onShowIgnoreChange(value) {
  return {
    type: SCRAPER_RESULTS_SHOW_IGNORE_CHANGE,
    value,
  }
}

export function onChangeSegment(result) {
  return {
    type: SCRAPER_RESULT_CHANGE_SEGMENT,
    result,
  }
}

export function onUpdateSegment(data) {
  return {
    type: SCRAPER_RESULT_UPDATE_SEGMENT,
    data
  }
}

export function onChangeSegmentConfirm(data) {
  return {
    type: SCRAPER_RESULT_CHANGE_SEGMENT_CONFIRM,
    data,
  }
}

export function onChangeSegmentCancel(result) {
  return {
    type: SCRAPER_RESULT_CHANGE_SEGMENT_CANCEL,
    result,
  }
}

export function onChangeAmount(result) {
  return {
    type: SCRAPER_RESULT_CHANGE_AMOUNT,
    result,
  }
}

export function onUpdateAmount(data) {
  return {
    type: SCRAPER_RESULT_UPDATE_AMOUNT,
    data
  }
}

export function onChangeAmountConfirm(data) {
  return {
    type: SCRAPER_RESULT_CHANGE_AMOUNT_CONFIRM,
    data,
  }
}

export function onChangeAmountCancel(result) {
  return {
    type: SCRAPER_RESULT_CHANGE_AMOUNT_CANCEL,
    result,
  }
}

export function onUpdateIgnore(result) {
  return {
    type: SCRAPER_RESULT_UPDATE_IGNORE,
    result,
  }
}

export function requestPendingResults() {
  return {
    type: SCRAPER_REQUEST_PENDING_RESULTS,
  }
}


export function receivePendingResults(results) {
  return {
    type: SCRAPER_RECEIVE_PENDING_RESULTS,
    results,
  }
}

export function requestRunScraper(scraper) {
  return {
    type: SCRAPER_REQUEST_RUN,
    scraper,
  }
}

export function receiveRunScraper(task) {
  return {
    type: SCRAPER_RECEIVE_RUN,
    task,
  }
}

export function requestLastRunScrapers() {
  return {
    type: SCRAPER_REQUEST_LAST_RUN_SCRAPERS,
  }
}

export function receiveLastRunScrapers(data) {
  return {
    type: SCRAPER_RECEIVE_LAST_RUN_SCRAPERS,
    data,
  }
}

export function requestDetectSegment(id) {
  return {
    type: SCRAPER_RESULT_REQUEST_DETECT_SEGMENT,
    id,
  }
}

export function receiveDetectSegment(data) {
  return {
    type: SCRAPER_RESULT_RECEIVE_DETECT_SEGMENT,
    data,
  }
}

export function fetchLastRunScrapers() {
  return function (dispatch) {
    
    dispatch(requestLastRunScrapers());        

    return fetch('/scrapers/last', {
      method: 'GET',
      credentials: 'include',
    })
    .then(response => response.json())
    .then(json => {
      const scraper = new Schema('scrapers', { idAttribute: '_id' });
      // Update state with received data
      dispatch(receiveLastRunScrapers(normalize(json.data, arrayOf(scraper))))
    });
  }
}

export function fetchPendingResults(scraperId) {
  return function (dispatch) {

    dispatch(requestPendingResults());

    return fetch('/scrapers/' + scraperId + '/pending', {
      method: 'GET',
      credentials: 'include',
    })
    .then(response => response.json())
    .then(json => {
      if(json.success) {
        dispatch(receivePendingResults(json.result));
      }
    });
  }
}

export function runScraper(scraper) {
  return function (dispatch) {

    dispatch(requestRunScraper(scraper));

    const body = {
      id: scraper._id,
    };
    
    return fetch('/scrapers/run', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include',
    })
      .then(response => response.json())
      .then(json => {

        if(json.success && json.data.taskId) {
          dispatch(receiveRunScraper({
            id: json.data.taskId,
            scraperId: scraper._id,
          }));
        }       
      });
  }
}

export function checkProgress(scraper) {
  return function (dispatch) {

    const taskId = scraper.taskId;
    
    return fetch('/scrapers/progress/' + taskId, {
      method: 'GET',
      credentials: 'include',
    })
    .then(response => response.json())
    .then(json => {
      if(json.success) {
        const data = json.data;
        if(data) {
          dispatch(onScraperUpdateStats({
            scraperId: scraper._id,
            stats: {
              ...data,
            }
          }));
          
          setTimeout(() => {
            if(data.isRunning) {
              dispatch(checkProgress(scraper));
            }
            else {
              dispatch(onScraperFinish(scraper._id));
            }
          }, 2000);
          
        }
      }
    });
  }
}

export function detectSegment(result) {
  return function (dispatch) {

    const id = result._id;

    dispatch(requestDetectSegment(id));

    const body = {
      input: result.description,
    }

    return fetch('/neural/detect', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include',
    })
    .then(response => response.json())
    .then(json => {
      if(json.success) {
        dispatch(receiveDetectSegment({
          resultId: result._id,
          segment: json.data,
        }))
      }
    });
  }
}