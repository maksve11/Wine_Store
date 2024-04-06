import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.isAuthenticated()) {
      res.redirect('/auth/login');
    } else {
      next();
    }
  }
}

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}
