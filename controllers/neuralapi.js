import request from 'request';
import { neural } from '../config/secrets';

const NEURAL_BASE_URL = neural.apiUri;

class NeuralApi {

  /**
   * POST /process
   * Processa a entrada e responde com prováveis
   * ids para o segmento
   */
  static processInput(input, callback) {
    if(typeof input === 'undefiend')
      return callback(new Error('Input Array is invalid!'));
    
    if(typeof input === 'string') {
      input = [ input ]
    }
    
    const body = {
      input: input
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
