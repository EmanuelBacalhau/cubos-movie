import { CreateUserController } from '@application/controllers/users/create-user-controller';
import { Registry } from './registry';
import { PrismaUserRepository } from '@infra/repositories/prisma/prisma-user-repository';
import { CreateUserUseCase } from '@application/useCases/create-user-use-case';
import { SignInUseCase } from '@application/useCases/sign-in-use-case';
import { SignInController } from '@application/controllers/users/sign-in-controller';

export const container = Registry.getInstance();

container.register(PrismaUserRepository, PrismaUserRepository)

container.register(CreateUserUseCase, CreateUserUseCase);
container.register(SignInUseCase, SignInUseCase);

container.register(CreateUserController, CreateUserController);
container.register(SignInController, SignInController);
