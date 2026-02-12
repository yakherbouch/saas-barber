import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { loginSchema, signupSchema } from '../modules/auth.schema.js';
import { store } from '../modules/inMemory.store.js';
import { tokenService } from '../services/token.service.js';
import { AppError } from '../utils/errors.js';

export const authController = {
  signup(req: Request, res: Response) {
    const payload = signupSchema.parse(req.body);
    if (store.findByEmail(payload.email)) {
      throw new AppError('Un compte existe déjà avec cet email.', 409);
    }

    const passwordHash = bcrypt.hashSync(payload.password, 10);
    const user = store.createUser({
      email: payload.email,
      fullName: payload.fullName,
      role: payload.role,
      passwordHash,
      emailVerified: false
    });

    return res.status(201).json({
      message: 'Compte créé. Vérifiez votre email pour activer votre compte.',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        emailVerified: user.emailVerified
      }
    });
  },

  login(req: Request, res: Response) {
    const payload = loginSchema.parse(req.body);
    const user = store.findByEmail(payload.email);
    if (!user || !bcrypt.compareSync(payload.password, user.passwordHash)) {
      throw new AppError('Email ou mot de passe incorrect.', 401);
    }

    const authUser = {
      id: user.id,
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified
    };

    const accessToken = tokenService.createAccessToken(authUser);
    const refreshToken = tokenService.createRefreshToken(authUser);

    return res.status(200).json({
      message: 'Connexion réussie.',
      accessToken,
      refreshToken,
      user: authUser
    });
  },

  forgotPassword(_req: Request, res: Response) {
    return res.status(200).json({
      message: 'Si un compte existe, un email de réinitialisation a été envoyé.'
    });
  }
};
