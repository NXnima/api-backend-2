import { check } from 'express-validator';

class AuthValidator{

  userdataValidator() {
    return [
      check('id').not().isEmpty()
    ];
  }

  changeDataUser() {
    return [
    check('email')
      .optional()
      .isEmail()
      .withMessage('email is invalid'),

    check('name')
      .optional()
      .notEmpty()
      .withMessage('name cant be empty'),

    check('password')
      .optional()
      .isLength({ min: 8 })
      .withMessage('password must be at least 8 characters')
  ];
  }
  setcommentValidator() {
    return [
      check('id').not().isEmpty(),
      check('comment').not().isEmpty()
    ];
  }
}

export default new AuthValidator();