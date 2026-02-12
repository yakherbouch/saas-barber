import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { env } from './config/env.js';
import { authController } from './controllers/auth.controller.js';
import { marketplaceController } from './controllers/marketplace.controller.js';
import { requireAuth, requireRole } from './middlewares/auth.middleware.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(morgan('combined'));
app.use(
  '/api',
  rateLimit({
    windowMs: 60 * 1000,
    max: 120,
    message: { message: 'Trop de requêtes, réessayez dans quelques instants.' }
  })
);

app.get('/api/health', (_req, res) => res.status(200).json({ status: 'ok' }));

app.post('/api/auth/inscription', authController.signup);
app.post('/api/auth/connexion', authController.login);
app.post('/api/auth/mot-de-passe-oublie', authController.forgotPassword);

app.get('/api/coiffeurs', marketplaceController.listHairdressers);
app.get('/api/avis', marketplaceController.listReviews);

app.get('/api/admin/metrics', requireAuth, requireRole(['ADMIN']), marketplaceController.adminMetrics);

app.use(errorMiddleware);
