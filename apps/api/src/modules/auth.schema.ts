import { z } from 'zod';

export const signupSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z
    .string()
    .min(10, 'Le mot de passe doit contenir au moins 10 caractères')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir une majuscule')
    .regex(/[0-9]/, 'Le mot de passe doit contenir un chiffre'),
  role: z.enum(['CLIENT', 'HAIRDRESSER'])
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});
