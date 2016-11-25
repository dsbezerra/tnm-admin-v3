import request from 'request';
import { neural } from '../config/secrets';

const NEURAL_BASE_URL = neural.apiUri;

class NeuralApi {

  /**
   * POST /process
   * Processa a entrada e response com prováveis
   * ids para o segmento
   */
  static processInput(inputArray, callback) {
    if(typeof inputArray === 'undefiend')
      return callback(new Error('Input Array is invalid!'));
    
    if(typeof inputArray === 'string') {
      inputArray = [ inputArray ]
    }
    
    const body = {
      input: inputArray
    };
    
    const options = {
      method: 'POST',
      uri: NEURAL_BASE_URL + '/process',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };

    request(options, (err, response, body) => {
      if(err) {
        return callback(err);
      }

      return callback(null, body);
    });
  }
}

export default NeuralApi;
