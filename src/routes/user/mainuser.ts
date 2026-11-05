import express, { Router } from 'express';
import controller from './controller.js';
import validator from './validator.js';

const router: Router = express.Router();

router.get(
  '/userdata',
  validator.userdataValidator(),
  controller.validate,
  controller.userdata
);

router.put(
  '/changeDataUser',
  validator.changeDataUser(),
  controller.validate,
  controller.changeDataUser
);
router.put(
  '/setcomment',
  validator.setcommentValidator(),
  controller.validate,
  controller.setcomment
);

export default router;