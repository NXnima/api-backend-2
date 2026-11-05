import express, { Router } from 'express';
import controller from './controller.js';
import validator from './validator.js';
import isAdmin from '../../middlewares/isAdmin.js';

const router: Router = express.Router();

router.get(
  '/menuShowProuct',
  validator.menuShowProuctsValidator,
  controller.menuShowProucts
);
router.get(
  '/search',
  validator.searchValidator,
  controller.search
);
router.get(
  '/getProduct',
  validator.getProductValidator,
  controller.getProduct
);
router.post(
  '/addProduct',
  isAdmin,
  validator.changeProductValidator,
  controller.addProduct
);
router.put(
  '/changeProduct',
  isAdmin,
  validator.changeProductValidator,
  controller.changeproduct
);
router.delete(
  '/deleteProduct',
  isAdmin,
  validator.deleteValidator,
  controller.deleteProuct
);
export default router;