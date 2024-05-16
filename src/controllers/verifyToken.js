const jwt = require('jsonwebtoken');

function verifyToken(token, callback) {
  jwt.verify(token, 'secret_key', (err, authData) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, authData);
    }
  });
}

module.exports = verifyToken;