import winston from 'winston';
import type { Request, Response, NextFunction } from 'express';

const error = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  winston.error(err.message, err);

  res.status(500).json({
    massage: '(server error) something failed',
  });
};

export default error;