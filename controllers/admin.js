import { generateError, makeApiRequest } from '../utils/ApiUtils';

/**
 * POST /login
 * Performs a admin login
 */
export const login = (req, res) => {
  
  const { email, password } = req.body;

  if(!email || !password) {
    const err = generateError('Invalid parameters.', 500);
    return res.status(err.statusCode).send(err);
  }

  const body = {
    email,
    password,
  };
 
  const parameters = {
    endpoint: '/adms/login',
    body: JSON.stringify(body),
  };
  
  makeApiRequest(parameters, (err, response) => {
    if(err) {
      return res.send(err);
    }
    
    if(response.statusCode === 200) {
      const responseBody = JSON.parse(response.body);

      // First letter to uppercase
      const firstLetter = responseBody.userId.charAt(0).toUpperCase();
      responseBody.userId = firstLetter + responseBody.userId.substring(1);
      
      req.session.user = {
	id: responseBody.userId,
	token: responseBody.id,
      };
      
      req.session.save(function(err) {
	if(err) {
          return res.send(generateError('Login Error', 401));
	}

        const redirect = req.query.r;
        if(redirect) {
          return res.redirect(redirect);
        }
        else {
          const r = {
	    success: true,
	    data: responseBody,
	  };
	  
	  return res.send(r);
        }	
      });
    }
    else {
      return res.send(generateError('Login Error', 401));
    }
  });
}

/**
 * POST /logout
 * Deleta a sessão e desloga o usuário, por fim redireciona para tela de login
 */
export const logout = (req, res) => {
  if(req.session) {
    const { user} = req.session;
    // If we have an user
    if(user) {

      logoutAdminFromApi(user.token, (err, response) => {
        if(err) {
          console.log(err);
        }

        if(response.statusCode === 204) {
          // logout was sucessfull
          req.session.destroy((err) => {
            if(err) {
              console.log(err);
            }

            console.log('Session destroyed. User is not logged anymore');

            return res.send({
              success: true,
            });
          });
        }
        else {
          return res.send({
            success: false,
          });
        }
      });      
    }
    else {
      // Redirect
      return res.redirect('/');
    }
  }
  else {
    // Redirect
    return res.redirect('/');
  }
}

const logoutAdminFromApi = (token, callback) => {
  if(!token)
    return callback(new Error('Token is invalid.'));

  const parameters = {
    endpoint: '/adms/logout',
    method: 'POST',
    headers: {
      'Authorization': token
    }
  };

  makeApiRequest(parameters, (err, response) => {
    if(err) {
      console.log(err);
      return callback(err);
    }

    return callback(null, response);
  });
}