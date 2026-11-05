import type IUser from '../src/models/user.js';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export {};