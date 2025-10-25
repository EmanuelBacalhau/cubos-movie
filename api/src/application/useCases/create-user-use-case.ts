import { User } from '@application/entities/user';
import { EmailAlreadyInUse } from '@application/errors/application/email-already-in-use';
import { PrismaUserRepository } from '@infra/repositories/prisma/prisma-user-repository';
import { Injectable } from '@kernel/decorators/injectable';
import { hashSync } from 'bcryptjs';

@Injectable()
export class CreateUserUseCase {
	constructor(private readonly userRepository: PrismaUserRepository) {}

	async execute(data: User.CreateInput): Promise<CreateUserUseCase.Response> {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new EmailAlreadyInUse();
    }

    const passwordHash = hashSync(data.password, 8);

    data.password = passwordHash;

    const user = await this.userRepository.create(data);
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
	}
}

export namespace CreateUserUseCase {
  export type Response = Omit<User, 'password'>;
}
