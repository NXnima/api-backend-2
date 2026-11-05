import Controller from '../controller.js';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';
import Query from '../../../database/db.js';
interface RegisterBody {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginBody {
  email: string;
  password: string;
}

class AuthController extends Controller {

  async register(
    req: Request<{}, {}, RegisterBody>,
    res: Response
  ): Promise<void> {

    const user = new this.User(
      _.pick(req.body, ['name', 'email', 'password'])
    );

    const exist = await Query.findUser(user);

    if (!exist) {
      return this.response({
        res,
        code: 400,
        massage: 'this user already registered'
      });
    }
    
    if (req.body.password !== req.body.confirmPassword) {
      return this.response({
        res,
        code: 400,
        massage: 'password and confirm password do not match'
      });
    }

    

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const result = await  Query.saveRegister(user);

    if(!result){
      this.response({
        res,
        code:500,
        massage : 'somthing went wrong'
      });
      return;
    }

    this.response({
      res,
      massage: 'the user successfully registered',
      data: _.pick(user, ['_id', 'name', 'email'])
    });
  }

  async login(
    req: Request<{}, {}, LoginBody>,
    res: Response
  ): Promise<void> {

    const user = Query.login(req.body.email);

    if (!user) {
      return this.response({
        res,
        code: 400,
        massage: 'invalid email or password'
      });
    }

    const isValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isValid) {
      return this.response({
        res,
        code: 400,
        massage: 'invalid email or password'
      });
    }

    const token = jwt.sign(
      { _id: user.id },
      config.get<string>('jwt_key')
    );

    this.response({
      res,
      massage: 'successfully logged in',
      data: { token }
    });
  }
}

export default new AuthController();