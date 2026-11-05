import { check } from 'express-validator';
interface menueproduct{
  startnumber : number;
  interval : number;
}

class AuthValidator{
  
  menuShowProuctsValidator() {
    return [
      check('startnumber').isInt({min : 1}).withMessage('startnumber must be a positive integer'),
      check('interval').isInt({min : 1}).withMessage('startnumber must be a positive integer'),
      check('startnumber').not().isEmpty(),
      check('interval').not().isEmpty()
    ]
  }

  searchValidator() {
    return [
      check('name').not().isEmpty()
    ];
  }
  getProductValidator() {
    return [
      check('id').not().isEmpty()
    ];
  }
  addValidator(){
    return [
      check('id').not().isEmpty(),
      check('stack').not().isEmpty().isInt({min : 1}),
      check('ipriced').not().isEmpty().isInt({min : 0}),
      check('icategoryd').not().isEmpty(),
      check('admin_id').not().isEmpty(),
    ]
  }
  changeProductValidator(){
    return [
      check('id').not().isEmpty(),
    ]
  }
  deleteValidator(){
    return [
      check('id').not().isEmpty()
    ]
  }
}

export default new AuthValidator();