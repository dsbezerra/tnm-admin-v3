import _ from 'lodash';
import shortid from 'shortid';

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

  NEURAL_ADD_INPUT,
  NEURAL_REMOVE_INPUT,
  NEURAL_UPDATE_INPUT,
  NEURAL_UPDATE_OUTPUT,
} from '../constants/ActionTypes';

const scraperInsertInitialState = {
  name: '',
  cityId: '',
  options: {}
};

const scraperInitialState = {
  action: 'scrapers',
  insert: scraperInsertInitialState,
  results: {
    list: [],
    numResults: 0,
    isFetching: false,
    showIgnored: false,
    changedAmounts: {},
    changedSegments: {},
    changingAmount: [],
    changingSegment: [],
    detectingSegment: [],
    processingFile: [],
    pagination: {
      current: 0,
      resultsPerPage: 25,
    }
  },
  last: {
    scrapers: {},
    ids: [],
    isFetching: false,
  },
  running: {},
  selected: {},
  isBarVisible: false,
  isBarExpanded: false,
};

const neuralNetworkInitialState = {
  train: {
    data: {},
    ids: [],
    count: 0,
  }
}

const initialState = {
  scraper: scraperInitialState,
  neuralNetwork: neuralNetworkInitialState,
}

const scraper = (state = scraperInitialState, action) => {

  switch(action.type) {

    case SCRAPER_ACTION_CHANGE:
      return {
        ...state,
        scraper: {
          ...state.scraper,
          action: action.action,
        }
      }

    case SCRAPER_PAGE_CHANGE:
      return {
        ...state,
        scraper: {
          ...state.scraper,
          results: {
            ...state.scraper.results,
            pagination: {
              ...state.scraper.results.pagination,
              current: state.scraper.results.pagination.current + action.dir,
            }
          }
          
        }
      }
      
    case SCRAPER_TOGGLE_BAR_VISIBILITY:
    {
      const isBarVisible = state.scraper.isBarVisible;
      return {
        ...state,
        scraper: {
          ...state.scraper,
          isBarVisible: !isBarVisible 
        }
      }
    }
      
    case SCRAPER_TOGGLE_BAR_EXPAND:
    {
      const isBarExpanded = state.scraper.isBarExpanded;
      return {
        ...state,
        scraper: {
          ...state.scraper,
          isBarExpanded: !isBarExpanded 
        }
      }
    }
      
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
                lastRunDate: new Date(),
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

    case SCRAPER_REQUEST_PENDING_RESULTS:
      return {
        ...state,
        scraper: {
          ...state.scraper,
          results: {
            ...state.scraper.results,
            isFetching: true,
          }
        }
      }
      
    case SCRAPER_RECEIVE_PENDING_RESULTS:
      return {
        ...state,
        scraper: {
          ...state.scraper,
          results: {
            ...state.scraper.results,
            list: action.results.data,
            numResults: action.results.count,
            isFetching: false,
            pagination: {
              ...state.scraper.results.pagination,
              current: 0,
              
            }
          }
        }
      }
      
    case SCRAPER_RESULTS_SHOW_IGNORE_CHANGE:
      return {
        ...state,
        scraper: {
          ...state.scraper,
          results: {
            ...state.scraper.results,
            showIgnored: action.value,
          }
        }
      }

    case SCRAPER_RESULT_REQUEST_DETECT_SEGMENT:
    {
      return {
        ...state,
        scraper: {
          ...state.scraper,
          results: {
            ...state.scraper.results,
            detectingSegment: [...state.scraper.results.detectingSegment, action.id]
          }
        }
      }
    }
      
    case SCRAPER_RESULT_RECEIVE_DETECT_SEGMENT:
    {
      const list = state.scraper.results.list;
      const detectingSegment = state.scraper.results.detectingSegment;
      const resultIndex = _.findIndex(list, (result) => {
        return result._id === action.data.resultId;
      });

      const segment = action.data.segment;

      return {
        ...state,
        scraper: {
          ...state.scraper,
          results: {
            ...state.scraper.results,
            list: [
              ...list.slice(0, resultIndex),
              list[resultIndex] = { ...list[resultIndex], segment: { id: segment.id,
                                                                     name: segment.descricao, } },
              ...list.slice(resultIndex + 1),
            ],
            detectingSegment: _.filter(detectingSegment, item => item !== action.data.resultId)
          }
        }
      }
    }

      
    case SCRAPER_RESULT_CHANGE_SEGMENT:
      return {
        ...state,
        scraper: {
          ...state.scraper,
          results: {
            ...state.scraper.results,
            changingSegment: [...state.scraper.results.changingSegment, action.result._id]
          }
        }
      }

    case SCRAPER_RESULT_UPDATE_SEGMENT:
      return {
        ...state,
        scraper: {
          ...state.scraper,
          results: {
            ...state.scraper.results,
            changedSegments: {
              ...state.scraper.results.changedSegments,
              [action.data.resultId]: action.data.segment,
            }
          }
        }
      }
      
    case SCRAPER_RESULT_CHANGE_SEGMENT_CONFIRM:
    {
      const list = state.scraper.results.list;
      const changingSegment = state.scraper.results.changingSegment;
      const resultIndex = _.findIndex(list, (result) => {
        return result._id === action.data.resultId;
      });

      return {
        ...state,
        scraper: {
          ...state.scraper,
          results: {
            ...state.scraper.results,
            list: [
              ...list.slice(0, resultIndex),
              list[resultIndex] = { ...list[resultIndex], segment: action.data.segment },
              ...list.slice(resultIndex + 1),
            ],
            changingSegment: _.filter(changingSegment, item => item !== action.data.resultId),
            changedSegments: _.omit({...state.scraper.results.changedSegments}, [action.data.resultId])
          }
        }
      }
    }

    case SCRAPER_RESULT_CHANGE_SEGMENT_CANCEL:
    {
      const changingSegment = state.scraper.results.changingSegment;
      return {
        ...state,
        scraper: {
          ...state.scraper,
          results: {
            ...state.scraper.results,
            changingSegment: _.filter(changingSegment, item => item !== action.result._id),
            changedSegments: _.omit({...state.scraper.results.changedSegments}, [action.result._id])
          }
        }
      }
    }

    case SCRAPER_RESULT_CHANGE_AMOUNT:
      return {
        ...state,
        scraper: {
          ...state.scraper,
          results: {
            ...state.scraper.results,
            changingAmount: [...state.scraper.results.changingAmount, action.result._id]
          }
        }
      }
      
    case SCRAPER_RESULT_UPDATE_AMOUNT:
      return {
        ...state,
        scraper: {
          ...state.scraper,
          results: {
            ...state.scraper.results,
            changedAmounts: {
              ...state.scraper.results.changedAmounts,
              [action.data.resultId]: action.data.amount,
            }
          }
        }
      }
      
    case SCRAPER_RESULT_CHANGE_AMOUNT_CONFIRM:
    {
      const list = state.scraper.results.list;
      const changingAmount = state.scraper.results.changingAmount;
      const resultIndex = _.findIndex(list, (result) => {
        return result._id === action.data.resultId;
      });
      
      return {
        ...state,
        scraper: {
          ...state.scraper,
          results: {
            ...state.scraper.results,
            list: [
              ...list.slice(0, resultIndex),
              list[resultIndex] = { ...list[resultIndex], amount: action.data.amount },
              ...list.slice(resultIndex + 1),
            ],
            changingAmount: _.filter(changingAmount, item => item !== action.data.resultId)
          }
        }
      }
    }
      
    case SCRAPER_RESULT_CHANGE_AMOUNT_CANCEL:
    {
      const changingAmount = state.scraper.results.changingAmount;
      return {
        ...state,
        scraper: {
          ...state.scraper,
          results: {
            ...state.scraper.results,
            changingAmount: _.filter(changingAmount, item => item !== action.result._id)
          }
        }
      }
    }

    case SCRAPER_RESULT_UPDATE_IGNORE:
    {
      const list = state.scraper.results.list;
      const resultIndex = _.findIndex(list, (result) => {
        return result._id === action.result._id;
      });
      
      return {
        ...state,
        scraper: {
          ...state.scraper,
          results: {
            ...state.scraper.results,
            list: [
              ...list.slice(0, resultIndex),
              list[resultIndex] = { ...action.result },
              ...list.slice(resultIndex + 1)
            ]
          }
        }
      }
    }
  }
}

const neuralNetwork = (state = neuralNetworkInitialState, action) => {

  switch(action.type) {

    case NEURAL_ADD_INPUT:
    {
      const id = shortid.generate();
      return {
        ...state,
        neuralNetwork: {
          ...state.neuralNetwork,
          train: {
            ...state.neuralNetwork.train,
            data: {
              ...state.neuralNetwork.train.data,
              [id]: {
                id: id,
                input: '',
                output: {},
              }
            },
            ids: [...state.neuralNetwork.train.ids, id],
            count: state.neuralNetwork.train.count + 1,
          }
        }
      }
    }
      
    case NEURAL_REMOVE_INPUT:
    {

      const { data, ids } = state.neuralNetwork.train;  
      return {
        ...state,
        neuralNetwork: {
          ...state.neuralNetwork,
          train: {
            ...state.neuralNetwork.train,
            data: _.omit({...state.neuralNetwork.train.data}, [action.id]),
            ids: _.filter(ids, id => action.id !== id),
            count: state.neuralNetwork.train.count - 1,
          }
        }
      }
    }
      
    case NEURAL_UPDATE_INPUT:
    {
      const { data } = state.neuralNetwork.train;
      return {
        ...state,
        neuralNetwork: {
          ...state.neuralNetwork,
          train: {
            ...state.neuralNetwork.train,
            data: {
              ...state.neuralNetwork.train.data,
              [action.data.id]: {
                ...state.neuralNetwork.train.data[action.data.id],
                input: action.data.value,
              }
            }
          }
        }
      }
    }

    case NEURAL_UPDATE_OUTPUT:
    {
      const { data } = state.neuralNetwork.train;
      return {
        ...state,
        neuralNetwork: {
          ...state.neuralNetwork,
          train: {
            ...state.neuralNetwork.train,
            data: {
              ...state.neuralNetwork.train.data,
              [action.data.id]: {
                ...state.neuralNetwork.train.data[action.data.id],
                output: action.data.segment,
              }
            }
          }
        }
      }
    }
  }
}

const tools = (state = initialState, action) => {

  switch(action.type) {
      
    case SCRAPER_ACTION_CHANGE:
    case SCRAPER_PAGE_CHANGE:
    case SCRAPER_TOGGLE_BAR_VISIBILITY:
    case SCRAPER_TOGGLE_BAR_EXPAND:
    case SCRAPER_SELECT_CHANGE:
    case SCRAPER_REQUEST_RUN:
    case SCRAPER_RECEIVE_RUN:
    case SCRAPER_START:
    case SCRAPER_FINISH:
    case SCRAPER_UPDATE_STATS:
    case SCRAPER_REQUEST_LAST_RUN_SCRAPERS:
    case SCRAPER_RECEIVE_LAST_RUN_SCRAPERS:
    case SCRAPER_REQUEST_PENDING_RESULTS:
    case SCRAPER_RECEIVE_PENDING_RESULTS:
    case SCRAPER_RESULTS_SHOW_IGNORE_CHANGE:
    case SCRAPER_RESULT_REQUEST_DETECT_SEGMENT:
    case SCRAPER_RESULT_RECEIVE_DETECT_SEGMENT:
    case SCRAPER_RESULT_CHANGE_SEGMENT:
    case SCRAPER_RESULT_UPDATE_SEGMENT:
    case SCRAPER_RESULT_CHANGE_SEGMENT_CONFIRM:
    case SCRAPER_RESULT_CHANGE_SEGMENT_CANCEL:
    case SCRAPER_RESULT_CHANGE_AMOUNT:
    case SCRAPER_RESULT_UPDATE_AMOUNT:
    case SCRAPER_RESULT_CHANGE_AMOUNT_CONFIRM:
    case SCRAPER_RESULT_CHANGE_AMOUNT_CANCEL:
    case SCRAPER_RESULT_UPDATE_IGNORE:
      return scraper(state, action);

    case NEURAL_ADD_INPUT:
    case NEURAL_REMOVE_INPUT:
    case NEURAL_UPDATE_INPUT:
    case NEURAL_UPDATE_OUTPUT:
      return neuralNetwork(state, action);
      
    default:
      return state;
  }
}

export default tools;