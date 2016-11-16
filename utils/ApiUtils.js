import { api } from '../config/secrets';
import request from 'request';

const MODEL = {
  Bidding: '/editais',
  Segment: '/segmentos',
  Agency: '/orgaos',
  City: '/cidades',
  State: '/estados',
  User: '/installations',
}

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

/**
 * Build the request options object and makes
 * an API request.
 * @param params Object The parameters for the request
 * @param callback function The callback that handles the response
 */
export const makeApiRequest = (params, callback) => {
  let url, body, method, filter, headers;

  if(!params.endpoint || !params.endpoint.startsWith('/')) {
    const err = generateError('Endpoint must be a valid relative URI', 400);
    return callback(err);
  }

  url = api.uri + params.endpoint;

  if(!!params.filter) {
    filter = '?filter=' + JSON.stringify(params.filter);
    url += filter;
  }

  body = params.body || undefined;

  headers = params.headers || defaultHeaders || {};

  // If no method was defined we assume it's a GET
  method = params.method || 'GET';

  if(body) {
    method = 'POST';
  }
  
  const options = {
    method: method,
    url: url,
    headers: headers,
    body: body,
  };
  
  request(options, (err, response) => {
    if(err) {
      callback(err, null);
    }
    else {
      callback(null, response);
    }
  });
}

/**
 * Performs a base authenticated GET request
 * @param req Object Express req object
 * @param endpoint string API endpoint
 * @param filter Object Filter object for the specific request
 * @param callback function Callback that handles the response
 */
export const baseAuthGetRequest = (req, endpoint, filter, callback) => {
  const accessToken = req.headers['authorization'];  
  if(!accessToken) {
    const err = generateError('Invalid Token', 400);
    return callback(err);
  }

  const parameters = {
    endpoint: endpoint,
    headers: {
      "Authorization": accessToken,
    },
    filter: filter,
  }

  makeApiRequest(parameters, (err, response) => {
    if(err) {
      callback(err);
    }
    else {;
      callback(null, response.body);
    }
  });
}

/**
 * Generates an error object
 * @param message string Error message
 * @param statusCode number Error status code
 */
export const generateError = (message, statusCode) => {
  return {
    success: false,
    message: message,
    statusCode: statusCode,
  };
}

/**
 * Generates a default response object
 * @param success boolean indicating if the request was successfull or not
 * @param data object arrays, objects, strings any type of data that can be returned
 */
export const generateResponse = (success, json, data) => {  
  return {
    success: success,
    data: json ? JSON.parse(data) : data
  }
}

export const buildParameters = (modelName, token, filter, method, body) => {
  const parameters = {
    endpoint: MODEL[modelName],
    filter: filter ? JSON.parse(filter) : undefined,
    body: body,
    method: method,
    headers: {
      'Authorization': token
    }
  };

  if(!body)
    delete parameters.body;
  if(!filter)
    delete parameters.filter;
  if(!token)
    delete parameters.headers;

  return parameters;
};