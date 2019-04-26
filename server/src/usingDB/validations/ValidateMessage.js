/* eslint-disable class-methods-use-this */
import Validator from 'validatorjs';

class ValidateUser {
  /**
   * @description Validates create user inputs
   *
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   *
   * @return {Function} next
   */
  static messageInput(request, response, next) {
    // eslint-disable-next-line object-curly-newline
    const { email, subject, message } = request.body;

    const data = {
      email,
      subject,
      message,
    };

    const rules = {
      email: 'required|email',
      subject: 'required',
      message: 'required',
    };

    const validation = new Validator(data, rules);

    if (validation.passes()) {
      return next();
    }

    return response.status(400).json({
      status: 400,
      data: {
        errors: validation.errors.all(),
      },
    });
  }

  static timeMessageInput(request, response, next) {
    // eslint-disable-next-line object-curly-newline
    const { email, subject, message, time } = request.body;

    const data = {
      email,
      subject,
      message,
      time,
    };

    const rules = {
      email: 'required|email',
      subject: 'required',
      message: 'required',
      time: 'required',
    };

    const validation = new Validator(data, rules);

    if (validation.passes()) {
      return next();
    }

    return response.status(400).json({
      status: 400,
      data: {
        errors: validation.errors.all(),
      },
    });
  }
}

export default ValidateUser;
