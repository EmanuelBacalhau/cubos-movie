import { CreateUserController } from '@application/controllers/users/hello-controller';
import { Registry } from './registry';
import { PrismaUserRepository } from '@infra/repositories/prisma/prisma-user-repository';
import { CreateUserUseCase } from '@application/useCases/create-user-use-case';

export const container = Registry.getInstance();

container.register(CreateUserController, CreateUserController);
container.register(PrismaUserRepository, PrismaUserRepository)
container.register(CreateUserUseCase, CreateUserUseCase);
