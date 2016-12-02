import fetch from 'node-fetch';

import express from 'express';
import _ from 'lodash';

import NeuralApi from './neuralapi';

const neural = express.Router();

neural.post('/detect', (req, res) => {
  const body = req.body;
  if(body) {
    const input = body.input;
    if(input) {
      NeuralApi.processInput(input, (err, responseBody) => {
        if(err) {
          console.log(err);
        }

        if(responseBody) {
          const response = JSON.parse(responseBody);
          if(response.count === 1) {
            const output = response.data[0].output;
            res.send({
              success: true,
              data: output,
            });
          }
          else {
            res.send({
              success: true,
              data: response.data,
            });
          }
        }
        else {
          res.send({
            success: false,
            message: 'Empty response.'
          })
        }
      });
    }
    else {
      res.send({
        success: false,
        message: 'Empty body.'
      })
    }
  }
  else {
    res.send({
      success: false,
      message: 'Empty body.'
    })
  }
});

export default neural;