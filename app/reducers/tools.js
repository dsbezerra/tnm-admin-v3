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

const scraperInitialState = {
  last: {
    scrapers: {},
    ids: [],
    isFetching: false,
  },
  running: {},
  selected: {},
};

const initialState = {
  scraper: scraperInitialState,
}

const scraper = (state = scraperInitialState, action) => {

  switch(action.type) {

    case SCRAPER_SELECT_CHANGE:
      return {
        ...state,
        scraper: {
          ...state.scraper,
          selected: action.selected,
        }
      }

    case SCRAPER_REQUEST_RUN:
      return {
        ...state,
        scraper: {
          ...state.scraper,
          running: {
            ...state.scraper.running,
            [action.scraper._id]: {
              isStarting: true,
              isRunning: false,
              isFinished: false,
            }
          }
        }
      }

    case SCRAPER_RECEIVE_RUN:
      return {
        ...state,
        scraper: {
          ...state.scraper,
          last: {
            ...state.scraper.last,
            scrapers: {
              ...state.scraper.last.scrapers,
              [action.task.scraperId]: {
                ...state.scraper.last.scrapers[action.task.scraperId],
                running: true,
              }
            }
          },
          running: {
            ...state.scraper.running,
            [action.task.scraperId]: {
              taskId: action.task.id,
              isStarting: false,
              isRunning: true,
              isFinished: false,
              startTime: Date.now(),
            }
          }
        }
      }

    case SCRAPER_FINISH:
      return {
        ...state,
        scraper: {
          ...state.scraper,
          last: {
            ...state.scraper.last,
            scrapers: {
              ...state.scraper.last.scrapers,
              [action.id]: {
                ...state.scraper.last.scrapers[action.id],
                running: false,
              }
            }
          },
          running: {
            ...state.scraper.running,
            [action.id]: {
              ...state.scraper.running[action.id],
              isRunning: false,
              isFinished: true,
              endTime: Date.now(),
            }
          }
        }
      }
        
    case SCRAPER_UPDATE_STATS:
    {

      const runningScraper = { ...state.scraper.running[action.data.scraperId] }
      
      return {
        ...state,
        scraper: {
          ...state.scraper,
          running: {
            ...state.scraper.running,
            [action.data.scraperId]: {
              ...runningScraper,
              stats: {
                ...action.data.stats,
              }
            }
          }
        }
      }
    }

    case SCRAPER_REQUEST_LAST_RUN_SCRAPERS:
      return {
        ...state,
        scraper: {
          ...state.scraper,
          last: {
            ...state.scraper.last,
            isFetching: true,
          }
        }
      }
      
    case SCRAPER_RECEIVE_LAST_RUN_SCRAPERS:
      return {
        ...state,
        scraper: {
          ...state.scraper,
          last: {
            ...state.scraper.last,
            scrapers: action.data.entities.scrapers,
            ids: action.data.result,
            isFetching: false,
          }
        }
      }
  }
}

const tools = (state = initialState, action) => {

  switch(action.type) {

    case SCRAPER_SELECT_CHANGE:
    case SCRAPER_REQUEST_RUN:
    case SCRAPER_RECEIVE_RUN:
    case SCRAPER_START:
    case SCRAPER_FINISH:
    case SCRAPER_UPDATE_STATS:
    case SCRAPER_REQUEST_LAST_RUN_SCRAPERS:
    case SCRAPER_RECEIVE_LAST_RUN_SCRAPERS:
      return scraper(state, action);
      
    default:
      return state;
  }
}

export default tools;