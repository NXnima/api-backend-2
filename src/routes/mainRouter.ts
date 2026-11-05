import express, { Router } from 'express';
import error from './../middlewares/errors.js';
import authRouter from './auth/authmain.js';
import ProductRouter from './product/mainproduct.js';
import UserRouter from './user/mainuser.js';
import OrderRouter from './order/mainorder.js';

const router: Router = express.Router();

router.use('/', authRouter);
router.use('/' , ProductRouter);
router.use('/' , UserRouter);
router.use('/' , OrderRouter);
router.use(error);

export default router;