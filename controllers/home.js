import {
  generateError,
  makeApiRequest
} from '../utils/ApiUtils';

import {
  countWithCallback
} from './generic';

import async from 'async';

/**
 * GET /metrics/database
 * Get database metrics
 */
export const getDatabaseMetrics = (req, res) => {
  
  const { token } = req.session.user;

  async.parallel([
    // Count of biddings
    function(callback) {
      countWithCallback('Bidding', token, callback);
    },
    // Count of agencies
    function(callback) {
      countWithCallback('Agency', token, callback)
    },
    // Count of segments
    function(callback) {
      countWithCallback('Segment', token, callback);
    },
    // Count of locations
    function(callback) {
      countWithCallback('City', token, callback);
    }
  ],
  function(err, results) {
    if(err) {
      return res.send(generateError(err.message, response.statusCode));
    }

    if(results && results.length === 4) {
      const numBiddings = getCount(results[0]);
      const numAgencies = getCount(results[1]);
      const numSegments = getCount(results[2]);
      const numLocations = getCount(results[3]);

      return res.send({
        success: true,
        data: {
          numBiddings,
          numAgencies,
          numSegments,
          numLocations,
        }
      });
    }    
  });
}

const getCount = (item) => {
  if(!item) {
    return -1;
  }

  return item.success ? item.data.count : -1;
}