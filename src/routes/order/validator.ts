import { check } from 'express-validator';

class AuthValidator{

  userOrderValidator() {
    return [
      check('id').not().isEmpty()
    ];
  }

  removeOrderByUserValidator() {
    return [
      check('id').not().isEmpty(),
      check('idOrder').not().isEmpty()
    ];
  }
  removeOrderByAdminValidate() {
    return [
      check('email').not().isEmpty().isEmail(),
      check('idOrder').not().isEmpty()
    ];
  }
  addOrderByUserValidator() {
    return [
      check('id').not().isEmpty(),
      check('productId').not().isEmpty()];
  }
  addOrderByAdminValidator() {
    return [
      check('email').not().isEmpty().isEmail(),
      check('productId').not().isEmpty()];
  }
}

export default new AuthValidator();