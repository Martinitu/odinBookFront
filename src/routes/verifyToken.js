function verifyToken(req, res, next) {
    
    let bearerToken = req.headers.authorization;
    
   
    //check if bearerToken is not undefined 
    if (typeof bearerToken !== 'undefined') {
    
      const bearer = bearerToken.split(' ');
      bearerToken = bearer[1];
      req.token = bearerToken;
      next()
    } else {
      
      res.sendStatus(403)
    }
  };

  module.exports = verifyToken