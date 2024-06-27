import { Request, Response, NextFunction } from 'express';
import passport from '../utils/auth.strategy';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {

  passport.authenticate('jwt', { session:false }, (err: any, user: any, info: any) => {
    if (err || !user) {
      return res.status(401).json({ message: info.message });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export const isAdmin = (req: any, res: Response, next: NextFunction) => {
  req.user.isAdmin ? next() : res.json({message: `You are not allowed to perform this action`})
};