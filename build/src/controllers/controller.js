"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _model = _interopRequireDefault(require("../models/model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prefer-destructuring */

/* eslint-disable object-shorthand */

/* eslint-disable no-else-return */
var Model = {
  createAUser: function createAUser(req, res) {
    var user = _model.default.createUser(req.body);

    var email = req.body.email;

    if (!email || !req.body.firstName || !req.body.lastName || !req.body.password) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    if (email || req.body.firstName || req.body.lastName || req.body.password) {
      // eslint-disable-next-line prefer-const
      var token = _jsonwebtoken.default.sign({
        email: email
      }, _config.default.secret, {
        expiresIn: '24h'
      });

      res.json({
        status: 200,
        data: {
          message: "Authentication successful!. Welcome ".concat(req.body.firstName),
          token: token
        }
      });
    }

    return '';
  },
  login: function login(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var mockEmail = 't@a.com';
    var mockPassword = 'test';

    if (!email || !password) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    if (email !== mockEmail || password !== mockPassword) {
      return res.status(400).json({
        message: 'Username or password is incorrect'
      });
    }

    if (email === mockEmail && password === mockPassword) {
      // eslint-disable-next-line prefer-const
      var token = _jsonwebtoken.default.sign({
        email: email
      }, _config.default.secret, {
        expiresIn: '24h'
      });

      res.json({
        status: 200,
        data: {
          token: token
        }
      });
    }

    return '';
  },
  sendMessage: function sendMessage(req, res) {
    if (!req.body.subject || !req.body.message || !req.body.sender || !req.body.reciever) {
      return res.status(400).send({
        message: 'All fields are required'
      });
    }

    var message = _model.default.sendMessage(req.body);

    return res.status(200).send(message);
  },
  getAllMessagesPerUser: function getAllMessagesPerUser(req, res) {
    var message = _model.default.getAllMessagesPerUser(req.params.id);

    if (!message) {
      res.status(404).send('the email(s) are no where to be found');
    }

    var arrOfMessages = [];
    Object.values(message).forEach(function (i) {
      return arrOfMessages.push(i);
    });
    res.status(200).send(Object.values(arrOfMessages));
  },
  getUnreadMessagesPerUser: function getUnreadMessagesPerUser(req, res) {
    var message = _model.default.getUnreadMessagesPerUser(req.params.id);

    if (!message) {
      res.status(404).send('the email(s) are no where to be found');
    }

    var arrOfMessages = [];
    Object.values(message).forEach(function (i) {
      return arrOfMessages.push(i);
    });
    res.status(200).send(Object.values(arrOfMessages));
  },

  /* credit: Orji Ikechukwu (LFA Andela) */
  getAMessage: function getAMessage(req, res) {
    var message = _model.default.getAMessage(req.params.id);

    if (!message) {
      res.status(404).send('the email(s) are no where to be found');
    }

    message.status = 'read';
    res.status(200).json(message);
  },
  getMessagesSentByAUser: function getMessagesSentByAUser(req, res) {
    var message = _model.default.getMessagesSentByAUser(req.params.id);

    if (!message) {
      res.status(404).send('the email(s) are no where to be found');
    }

    var arrOfSentMessages = [];
    Object.values(message).forEach(function (i) {
      return arrOfSentMessages.push(i);
    });
    res.status(200).send(Object.values(arrOfSentMessages));
  },
  getOneUser: function getOneUser(req, res) {
    var user = _model.default.findOneUser(req.params.id);

    if (!user) {
      return res.status(404).send({
        message: 'user email not found'
      });
    }

    return res.status(200).send(user);
  },
  deleteAMessage: function deleteAMessage(req, res) {
    var message = _model.default.getAMessage(req.params.id);

    if (!message) {
      res.status(404).send('the email(s) are no where to be found');
    }

    var msgToBeDeleted = _model.default.deleteAMessage(req.params.id);

    res.status(404).send('the selected message is deleted');
  }
};
var _default = Model;
exports.default = _default;