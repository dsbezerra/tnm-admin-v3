import { normalize, Schema, arrayOf } from 'normalizr';

import {
  SCRAPER_SELECT_CHANGE,
  SCRAPER_REQUEST_RUN,
  SCRAPER_RECEIVE_RUN,
  SCRAPER_START,
  SCRAPER_FINISH,
  SCRAPER_UPDATE_STATS,
  SCRAPER_REQUEST_LAST_RUN_SCRAPERS,
  SCRAPER_RECEIVE_LAST_RUN_SCRAPERS,
} from '../constants/ActionTypes';

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

export function fetchLastRunScrapers() {
  return function (dispatch) {
    dispatch(requestLastRunScrapers());    
    let url = '/scrapers/last';
    
    return fetch(url, {
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
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
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