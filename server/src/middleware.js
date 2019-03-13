/* eslint-disable consistent-return */
/* credit: Naren Yellavula of dev.bits() blog */
import jwt from 'jsonwebtoken';
// import config from './config';

const checkToken = (req, res, next) => {
  // Express headers are auto converted to lowercase
  let token = req.headers['x-access-token'] || req.headers.authorization;
  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    //check if the token was created by me using my secret. if there is an error, it says token is invalid, if success, show decoded
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).send({
          status: 'error',
          message: 'Token is not valid',
        });
      }
      req.decodedMessage = decoded;
      next();
    });
    /* if no token is supplied */
  } else {
    return res.status(400).json({
      status: 'error',
      message: 'Auth token is not supplied',
    });
  }
};
//es6 way to export, add s if you're exporting more than one thing
export {
  checkToken
}

