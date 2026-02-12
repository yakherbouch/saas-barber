import { NextFunction, Request, Response } from 'express';
import { tokenService } from '../services/token.service.js';
import { AppError } from '../utils/errors.js';
import { UserRole } from '../types/index.js';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: UserRole;
        emailVerified: boolean;
      };
    }
  }
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const bearer = req.headers.authorization;
  if (!bearer?.startsWith('Bearer ')) {
    throw new AppError('Authentification requise.', 401);
  }

  const token = bearer.replace('Bearer ', '');
  req.user = tokenService.verifyAccessToken(token);
  next();
}

export function requireRole(roles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new AppError('Accès refusé.', 403);
    }
    next();
  };
}
