"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable consistent-return */

/* credit: Naren Yellavula of dev.bits() blog */
var checkToken = function checkToken(req, res, next) {
  // Express headers are auto converted to lowercase
  var token = req.headers['x-access-token'] || req.headers.authorization;

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    /* using jswebtoken and secret in config.js, validate token */
    _jsonwebtoken.default.verify(token, _config.default.secret, function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      }

      req.decoded = decoded;
      next();
    });
    /* if no token is supplied */

  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken
};