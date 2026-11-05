import autoBind from 'auto-bind';
import { validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';
import type { Model } from 'mongoose';

import User from '../models/user.js';
import type { IUser } from '../models/user.js';

export default class Controller {

  protected User: Model<IUser> = User;

  constructor() {
    autoBind(this);
  }

  validationBody(req: Request, res: Response): boolean {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      const errors = result.array();
      const messages: string[] = [];

      errors.forEach(err => messages.push(err.msg));

      res.status(400).json({
        massage: 'validation error',
        data: messages
      });

      return false;
    }

    return true;
  }

  validate(req: Request, res: Response, next: NextFunction): void {
    if (!this.validationBody(req, res)) {
      return;
    }

    next();
  }

  response({
    res,
    massage,
    code = 200,
    data = {}
  }: {
    res: Response;
    massage?: string;
    code?: number;
    data?: unknown;
  }): void {
    res.status(code).json({
      massage,
      data
    });
  }
}