import { User } from '@application/entities/user';

export interface IUserRepository {
  create(data: User.CreateInput): Promise<User>;
	findByEmail(email: string): Promise<User | null>;
}
