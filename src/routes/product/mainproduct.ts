import express, { Router } from 'express';
import controller from './controller.js';
import validator from './validator.js';
import isAdmin from '../../middlewares/isAdmin.js';

const router: Router = express.Router();

router.get(
  '/menuShowProuct',
  controller.validate,
  validator.menuShowProuctsValidator(),
  controller.menuShowProucts
);
router.get(
  '/search',
  controller.validate,
  validator.searchValidator(),
  controller.search
);
router.get(
  '/getProduct',
  controller.validate,
  validator.getProductValidator(),
  controller.getProduct
);
router.post(
  '/addProduct',
  isAdmin,
  controller.validate,
  validator.changeProductValidator(),
  controller.addProduct
);
router.put(
  '/changeProduct',
  isAdmin,
  controller.validate,
  validator.changeProductValidator(),
  controller.changeproduct
);
router.delete(
  '/deleteProduct',
  isAdmin,
  validator.deleteValidator(),
  controller.validate,
  controller.deleteProuct
);
export default router;