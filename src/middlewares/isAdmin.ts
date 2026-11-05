import type { Request, Response, NextFunction } from 'express';

export default function isAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): void {

  if (!req.user || !req.user.isadmin) {
    res.status(403).json({
      message: 'Access denied. Admin permission required.'
    });
    return;
  }

  next();
}