import bcrypt from 'bcryptjs';
import { UserRole } from '../types/index.js';

export interface UserRecord {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  passwordHash: string;
  emailVerified: boolean;
}

const users: UserRecord[] = [
  {
    id: 'admin-1',
    email: 'admin@coiffedom.fr',
    fullName: 'Admin CoiffeDom',
    role: 'ADMIN',
    passwordHash: bcrypt.hashSync('Admin123456!', 10),
    emailVerified: true
  }
];

export const store = {
  users,
  createUser(payload: Omit<UserRecord, 'id'>) {
    const user: UserRecord = { ...payload, id: `user-${users.length + 1}` };
    users.push(user);
    return user;
  },
  findByEmail(email: string) {
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }
};
