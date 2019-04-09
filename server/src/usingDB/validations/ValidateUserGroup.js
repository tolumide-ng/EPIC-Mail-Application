/* eslint-disable class-methods-use-this */
import Validator from 'validatorjs';

class ValidateUserGroup {
  /**
   * @description Validates create user inputs
   *
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   *
   * @return {Function} next
   */
  static groupInput(request, response, next) {
    // eslint-disable-next-line object-curly-newline
    const { userEmails } = request.body;

    const data = {
      userEmails,
    };

    const rules = {
      userEmails: 'required|email',
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

export default ValidateUserGroup;
