"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable radix */
var Epicmail =
/*#__PURE__*/
function () {
  /**
   * class constructor
   * @param {object} data
   */
  function Epicmail() {
    _classCallCheck(this, Epicmail);

    this.epic = [];
  }
  /**
  *
  * @returns {object} reflection object
  */


  _createClass(Epicmail, [{
    key: "createUser",
    value: function createUser(data) {
      var newUser = {
        userId: this.epic.length + 1,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password
      };
      this.epic.push(newUser);
      return newUser;
    }
  }, {
    key: "login",
    value: function login(data) {
      var login = {
        email: data.email,
        password: data.password
      };
      this.epic.push(login);
      return login;
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(data) {
      var newMessage = {
        messageId: this.epic.length + 1,
        createdOn: new Date(),
        email: data.email,
        subject: data.subject,
        message: data.message,
        status: 'unread',
        sender: data.sender,
        reciever: data.reciever
      };
      this.epic.push(newMessage);
      return newMessage;
    }
  }, {
    key: "getAllMessagesPerUser",
    value: function getAllMessagesPerUser(id) {
      return this.epic.filter(function (c) {
        return c.reciever === parseInt(id);
      });
    }
  }, {
    key: "getAMessage",
    value: function getAMessage(id) {
      return this.epic.find(function (c) {
        return c.messageId === parseInt(id);
      });
    }
  }, {
    key: "getUnreadMessagesPerUser",
    value: function getUnreadMessagesPerUser(id) {
      return this.epic.filter(function (c) {
        return c.reciever === parseInt(id) && c.status === 'unread';
      });
    }
  }, {
    key: "getMessagesSentByAUser",
    value: function getMessagesSentByAUser(id) {
      return this.epic.filter(function (c) {
        return c.sender === parseInt(id);
      });
    }
  }, {
    key: "findOneUser",
    value: function findOneUser(id) {
      return this.epic.find(function (c) {
        return c.userId === parseInt(id);
      });
    }
  }, {
    key: "deleteAMessage",
    value: function deleteAMessage(id) {
      var msg = this.getAMessage(id);
      var index = this.epic.indexOf(msg);
      this.epic.splice(index, 1);
      return {};
    }
  }]);

  return Epicmail;
}();

var _default = new Epicmail();

exports.default = _default;