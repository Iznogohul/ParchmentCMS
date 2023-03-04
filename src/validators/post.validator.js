const { param } = require('express-validator');
const { validationResult } = require('express-validator');

exports.validateParamId = [
  param('id')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Id can not be empty!')
    .bail()
    .isString()
    .withMessage('Id must be a string!')
    .bail(),
];
exports.checkRules = (req, res, next) => {
  try {
    validationResult(req).throw();
    next();
  } catch {
    next(new Error(validationResult(req).errors[0].msg));
  }
};
