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
      countWithCallback('Bidding', token,  null, callback);
    },
    // Count of agencies
    function(callback) {
      countWithCallback('Agency', token, null,callback)
    },
    // Count of segments
    function(callback) {
      countWithCallback('Segment', token, null, callback);
    },
    // Count of locations
    function(callback) {
      countWithCallback('City', token, null,callback);
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

/**
 * GET /metrics/users
 * Get users metrics
 */
export const getUsersMetrics = (req, res) => {
  
  const { token } = req.session.user;

  async.parallel([
    // Count of users
    function(callback) {
      countWithCallback('User', token, null, callback);
    },
    // Count of premium users
    function(callback) {
      const where = { plano: 'subscription_premium' };
      countWithCallback('User', token, where, callback);
    },
    // Count of default users
    function(callback) {
      const where = { plano: 'subscription_default' };
      countWithCallback('User', token, where, callback);
    },
    // Count of basic users
    function(callback) {
      const where = { plano: 'subscription_basic' };
      countWithCallback('User', token, where, callback);
    },
    // Count of basic users
    function(callback) {
      const where = { plano: 'subscription_trial' };
      countWithCallback('User', token, where, callback);
    },
    // Count of today users
    function(callback) {
      const date = new Date();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const day = date.getDate();
      const today = new Date(`'${year}-${month}-${day}'`);
      
      const where = {
        activationDate: {
          gte: today,
        }
      };
      countWithCallback('User', token, where, callback);
    },
  ],
  function(err, results) {
    if(err) {
      return res.send(generateError(err.message, response.statusCode));
    }

    if(results && results.length === 6) {
      const total = getCount(results[0]);
      const numPremiums = getCount(results[1]);
      const numDefaults = getCount(results[2]);
      const numBasics = getCount(results[3]);
      const numTrials = getCount(results[4]);
      const numToday = getCount(results[5]);
      
      return res.send({
        success: true,
        data: {
          total,
          numPremiums,
          numDefaults,
          numBasics,
          numTrials,
          numToday
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