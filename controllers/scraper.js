
import fetch from 'node-fetch';

import express from 'express';
import _ from 'lodash';

import NeuralApi from './neuralapi';

import {
  generateResponse,
  generateError,
} from '../utils/ApiUtils';

const BASE_URI = 'https://scraper-tnmwebapp.rhcloud.com/';

const DEFAULT_HEADERS = {
  'User-Agent': 'TNM-Admin-v3',
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const scrapers = express.Router();

scrapers.post('/run', (req, res) => {

  const options = {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(req.body)
  };

  fetch(BASE_URI + '/scrapers/run', options)
    .then(response => response.json())
    .then(json => {

      if(json.success) {
        res.send({
          success: true,
          data: {
            taskId: json.taskId,
          }
        });
      }
      else {
        res.status(500).send(json);
      }
         
    });
});

scrapers.get('/progress/:id', (req, res) => {
  const id = req.params.id;
  if(id) {
    const options = {
      method: 'GET',
      headers: DEFAULT_HEADERS,
    };

    fetch(BASE_URI + '/scrapers/checkProgress/' + id, options)
      .then(response => response.json())
      .then(json => {
        if(json.success) {
          res.send({
            success: true,
            data: json.result.data,
          })
        }
        else {
          res.send(json);
        }
      });
  }
  else {
    return res.send({
      success: false,
      message: 'Invalid ID.'
    })
  }
});

/**
 * GET /scrapers/last
 * TODO(diego): Make this retrieve order by lastRunDate DESC
 */
scrapers.get('/last', (req, res) => {
  const options = {
    method: 'GET',
    headers: DEFAULT_HEADERS,
  };

  fetch(BASE_URI + '/scrapers', options)
    .then(response => response.json())
    .then(json => {
      if(json.success) {
        res.send({
          success: true,
          data: json.result.data
        })
      }
      else {
        res.status(500).send(json);
      }
    });
});

export default scrapers;