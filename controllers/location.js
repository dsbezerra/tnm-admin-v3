import {
  generateError,
  makeApiRequest
} from '../utils/ApiUtils';

/**
 * GET /location/states/:id/cities
 */
export const getCitiesFromState = (req, res) => {
  
  const { token } = req.session.user;
  const id = req.params.id;
  if(id) {

    const filter = { order: 'nome ASC' };
    
    const parameters = {
      endpoint: '/estados/' + id + "/cidades",
      headers: {
        'Authorization': token,
      },
      filter: filter
    };

    makeApiRequest(parameters, (err, response) => {
      if(err) {
        console.log(err);
        return res.send(err);
      }

      const r = {
        success: true,
        data: JSON.parse(response.body)
      }

      return res.send(r);
      
    });
    
  }
  else {
    return res.send({
      success: false,
      message: 'Parâmetros inválidos!'
    })
  }
}