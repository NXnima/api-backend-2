import express, { Router } from 'express';
import error from './../middlewares/errors.js';
import authRouter from './auth/authmain.js';
import ProductRouter from './product/mainproduct.js';
import UserRouter from './user/mainuser.js';
import OrderRouter from './order/mainorder.js';

const router: Router = express.Router();

router.use('/auth', authRouter);
router.use('./product' , ProductRouter);
router.use('./user' , UserRouter);
router.use('./order' , OrderRouter);
router.use(error);

export default router;