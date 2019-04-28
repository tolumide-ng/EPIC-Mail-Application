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
  static userInput(request, response, next) {
    // eslint-disable-next-line object-curly-newline
    const { firstName, lastName, email, password, recoveryEmail } = request.body;

    const data = {
      firstName,
      lastName,
      email,
      recoveryEmail,
      password,
    };

    const rules = {
      firstName: 'required|string|min:3',
      lastName: 'required|string|min:3',
      email: 'required|email',
      recoveryEmail: 'required|email',
      password: 'required|min:6',
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

  /**
   * @description Validates create user inputs on login
   *
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   *
   * @return {Function} next
   */
  static userInputLogin(request, response, next) {
    const { email, password } = request.body;

    const data = {
      email,
      password,
    };

    const rules = {
      email: 'required|email',
      password: 'required',
    };

    const validation = new Validator(data, rules);

    if (validation.passes()) {
      return next();
    }

    return response.status(400).json({
      status: 'fail',
      data: {
        errors: validation.errors.all(),
      },
    });
  }

  /* reset link patch api/v2/auth/reset */
  static userInputResetPassword(request, response, next) {
    // eslint-disable-next-line camelcase
    const { password_confirmation, password, token } = request.body;

    const data = { password_confirmation, password, token };

    const rules = {
      password: 'required|confirmed',
      token: 'required|string',
    };

    const validation = new Validator(data, rules);

    if (validation.passes()) {
      return next();
    }

    return response.status(400).json({
      status: 400,
      error: Object.values(validation.errors.all())[0],
    });
  }

  /* reset link post api/v2/auth/reset */
  static userInputSendReset(request, response, next) {
    const validation = new Validator(request.body, { email: 'required|email' });

    if (validation.passes()) return next();

    return response.status(400).json({
      status: 400,
      error: validation.errors.all(),
    });
  }

  static imageInput(request, response, next) {
    // eslint-disable-next-line object-curly-newline
    const { image } = request.body;

    const data = {
      image,
    };

    const rules = {
      image: 'required',
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

  static profileInfo(request, response, next) {
    const { firstName, lastName, recoveryEmail } = request.body;

    const data = {
      firstName, lastName, recoveryEmail,
    };

    const rules = {
      firstName: 'required_without_all:lastName,recoveryEmail|string|min:3',
      lastName: 'required_without_all:firstName,recoveryEmail|string|min:3',
      recoveryEmail: 'required_without_all:firstName,lastName|email',
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
