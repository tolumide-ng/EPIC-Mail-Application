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
}
export default new Epicmail();