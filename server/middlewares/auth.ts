import { Request, Response, NextFunction } from 'express';

export const authMiddleware = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    next();
  } catch (err) {
    return res.status(401);
  }
};
