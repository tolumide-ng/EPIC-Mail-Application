"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _controller = _interopRequireDefault(require("./src/controllers/controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-extraneous-dependencies */

/* credit: Olawale Aladeusi */
var app = (0, _express.default)();
app.use(_bodyParser.default.urlencoded({
  // Middleware
  extended: true
}));
app.use(_bodyParser.default.json());
app.use(_express.default.json());
app.get('/', function (req, res) {
  return res.status(200).send({
    message: 'YAY! Congratulations! Your first endpoint is working'
  });
});
app.post('/api/v1/auth/signup', _controller.default.createAUser);
app.post('/api/v1/auth/login', _controller.default.login);
app.post('/api/v1/messages/createMessage', _controller.default.sendMessage);
app.get('/api/v1/messages/allMessagesPerUser/:id', _controller.default.getAllMessagesPerUser);
app.get('/api/v1/messages/getAMessage/:id', _controller.default.getAMessage);
app.get('/api/v1/messages/unreadMessagesPerUser/:id', _controller.default.getUnreadMessagesPerUser);
app.get('/api/v1/messages/getMessagesSentByAUser/:id', _controller.default.getMessagesSentByAUser);
app.get('/api/v1/users/:id', _controller.default.getOneUser);
app.delete('/api/v1/messages/deleteAMessage/:id', _controller.default.deleteAMessage);
/* when the function is called, it should listen on a port */

/* To automatically pick port on the server instead of usin a single port */

var port = process.env.port || 6000;
app.listen(port, function () {
  return console.log("Listening on ".concat(port));
});
var _default = app;
exports.default = _default;