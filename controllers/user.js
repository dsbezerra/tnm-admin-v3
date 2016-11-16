
/**
 * Login Endpoint
 */
export const login = (req, res) => {
  console.log(req.body);


  setTimeout(() => {
    return res.send({
      success: true,
      message: 'Welcome!',
    });
  }, 10000);
  
}

