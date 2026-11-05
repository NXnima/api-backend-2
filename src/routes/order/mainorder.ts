import express, { Router } from 'express';
import controller from './controller.js';
import validator from './validator.js';
import isAdmin from '../../middlewares/isAdmin.js';

const router: Router = express.Router();

router.get(
  '/userOrder',
  validator.userOrderValidator(),
  controller.validate,
  controller.userOrder
);

router.delete(
  '/removeOrderByUser',
  validator.removeOrderByUserValidator(),
  controller.validate,
  controller.removeOrderByUser
);

router.delete(
  '/removeOrderByAdmin',
  validator.removeOrderByAdminValidate(),
  isAdmin,
  controller.validate,
  controller.removeOrderByAdmin
);

router.post(
  '/addOrderByUser',
  validator.addOrderByUserValidator(),
  controller.validate,
  controller.addOrderByUser
);

router.post(
  '/addOrderByAdmin',
  validator.addOrderByAdminValidator(),
  controller.validate,
  controller.addOrderByAdmin
);

export default router;