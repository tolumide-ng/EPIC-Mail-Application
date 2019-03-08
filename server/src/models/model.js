/* eslint-disable radix */
class Epicmail {
    /**
     * class constructor
     * @param {object} data
     */
    constructor() {
      this.epic = [];
    }

      /**
   *
   * @returns {object} reflection object
   */
  createUser(data) {
    const newUser = {
      userId: this.epic.length + 1,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    };
    this.epic.push(newUser);
    return newUser;
  }

  login(data) {
    const login = {
      email: data.email,
      password: data.password,
    };
    this.epic.push(login);
    return login;
  }

  sendMessage(data) {
    const newMessage = {
      messageId: this.epic.length + 1,
      createdOn: new Date(),
      email: data.email,
      subject: data.subject,
      message: data.message,
      status: 'unread',
      sender: data.sender,
      reciever: data.reciever,
    };
    this.epic.push(newMessage);
    return newMessage;
  }

  getAllMessagesPerUser(id) {
    return this.epic.filter(c => c.reciever === parseInt(id));
  }

  getAMessage(id) {
    return this.epic.find(c => c.messageId === parseInt(id));
  }

  getUnreadMessagesPerUser(id) {
    return this.epic.filter(c => c.reciever === parseInt(id) && c.status === 'unread');
  }

  getMessagesSentByAUser(id) {
    return this.epic.filter(c => c.sender === parseInt(id));
  }



}
export default new Epicmail();