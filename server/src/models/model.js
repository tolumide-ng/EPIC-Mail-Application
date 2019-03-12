import bcrypt from 'bcrypt';
/* eslint-disable radix */
class Epicmail {
    /**
     * class constructor
     * @param {object} data
     */
    constructor() {
      this.user = [];
      this.message = [];
    }

      /**
   *
   * @returns {object} reflection object
   */
  createUser(data) {
    const newUser = {
      userId: this.user.length + 1,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    };
    this.user.push(newUser);
    return newUser;
  }

  login(data) {
    const login = {
      email: data.email,
      password: data.password,
    };
    this.user.push(login);
    return login;
  }

  sendMessage(data) {
    const newMessage = {
      messageId: this.message.length + 1,
      createdOn: new Date(),
      email: data.email,
      subject: data.subject,
      message: data.message,
      status: 'unread',
      sender: data.sender,
      reciever: data.reciever,
    };
    this.message.push(newMessage);
    return newMessage;
  }

  getAllMessagesPerUser(id) {
    return this.message.filter(c => c.reciever === parseInt(id));
  }

  getAMessage(id) {
    return this.message.find(c => c.messageId === parseInt(id));
  }

  getUnreadMessagesPerUser(id) {
    return this.message.filter(c => c.reciever === parseInt(id) && c.status === 'unread');
  }

  getMessagesSentByAUser(id) {
    return this.message.filter(c => c.sender === parseInt(id));
  }

  findOneUser(id) {
    return this.user.find(c => c.userId === parseInt(id));
  }

  findOneEmail(email) {
    return this.user.find(c => c.email === email);
  }

  deleteAMessage(id) {
    const msg = this.getAMessage(id);
    const index = this.message.indexOf(msg);
    this.message.splice(index, 1);
    return {};
  }

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  }

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

}
export default new Epicmail();