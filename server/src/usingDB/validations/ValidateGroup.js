/* eslint-disable class-methods-use-this */
import Validator from 'validatorjs';

class ValidateGroup {
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
    const { groupname, groupemail } = request.body;

    const data = {
      groupname,
      groupemail,
    };

    const rules = {
      groupname: 'required',
      groupemail: 'required|email',
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

export default ValidateGroup;
