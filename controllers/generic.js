import {
  buildParameters,
  generateResponse,
  generateError,
  makeApiRequest,
} from '../utils/ApiUtils';

/**
 * GET /model
 */
export const getAll = (modelName, req, res) => {

  const { filter } = req.query;
  const { token } = req.session.user;

  const parameters = buildParameters(modelName, token, filter);
  
  makeApiRequest(parameters, (err, response) => {
    if(err) {
      return res.send(
        generateError(err.message, response.statusCode)
      );
    }

    return res.send(
      generateResponse(true, true, response.body)
    );
  });
};

/**
 * GET /model/:id
 */
export const getById = (modelName, req, res) => {
  
  const { id } = req.params;
  if(!id) {
    return res.send(
      generateError('Invalid ID', 400)
    );
  }

  const { filter } = req.query;
  const { token } = req.session.user;
  let parameters = buildParameters(modelName, token, filter);
  parameters.endpoint += '/' + id;
  
  makeApiRequest(parameters, (err, response) => {
    if(err) {
      return res.send(
        generateError(err.message, response.statusCode)
      );
    }

    return res.send(
      generateResponse(true, true, response.body)
    )
  });
};

/**
 * POST /model
 */
export const insert = (model, req, res) => {

  const body = req.body;
  if(!body) {
    return res.send(
      generateError('Empty body.', 400)
    );
  }

  const { token } = req.session.user;
  const parameters = buildParameters(modelName, token, null, 'POST', body);
  makeApiRequest(parameters, (err, response) => {
    if(err) {
      return res.send(
        generateError(err.message, response.statusCode)
      );
    }

    return res.send(
      generateResponse(true, true, response.body)
    )
  });
  
}

/**
 * PUT /model/:id
 */
export const updateById = (model, req, res) => {
  
  const id = req.params.id;
  if(!id) {
    return res.send(generateError('Invalid ID.', 400));
  }

  const body = req.body;
  if(!body) {
    return res.send(generateError('Empty body.', 400));
  }

  const { token } = req.session.user;
  let parameters = buildParameters(modelName, token, null, 'PUT', body);
  parameters.endpoint += `/${id}`;

  makeApiRequest(parameters, (err, response) => {
    if(err) {
      return res.send(
        generateError(err.message, response.statusCode)
      );
    }

    return res.send(
      generateResponse(true, true, response.body)
    )
  });
}

/**
 * DEL /model/:id
 */
export const deleteById = (model, req, res) => {
  
  const id = req.params.id;
  if(!id) {
    return res.send(
      generateError('Invalid ID.', 400)
    );
  }

  const { token } = req.session.user;
  let parameters = buildParameters(modelName, token, null, 'DELETE', body);
  parameters.endpoint += `/${id}`;
  
  makeApiRequest(parameters, (err, response) => {
    if(err) {
      return res.send(
        generateError(err.message, response.statusCode)
      );
    }

    return res.send(
      generateResponse(true, true, response.body)
    )
  });
}

/**
 * GET /count
 */
export const count = (model, req, res) => {
  
  const { token } = req.session.user;

  const parameters = buildParameters(modelName, token, req.query.filter);
  parameters.endpoint += '/count';
  
  makeApiRequest(parameters, (err, response) => {
    if(err) {
      return res.send(
        generateError(err.message, response.statusCode)
      );
    }

    return res.send(
      generateResponse(true, true, response.body)
    );
  });
}

export const countWithCallback = (modelName, token, where, callback) => {
  
  const parameters = buildParameters(modelName, token, null);
  parameters.endpoint += '/count';

  if(where) {
    parameters.endpoint += '?where=' + JSON.stringify(where);
  }
  
  makeApiRequest(parameters, (err, response) => {
    if(err) {
      return callback(err);
    }

    return callback(null, generateResponse(true, true, response.body));
  });
}