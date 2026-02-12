export type UserRole = 'CLIENT' | 'HAIRDRESSER' | 'ADMIN';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  emailVerified: boolean;
}
