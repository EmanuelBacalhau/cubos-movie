import { CreateUserController } from '@application/controllers/users/create-user-controller';
import { Registry } from './registry';
import { PrismaUserRepository } from '@infra/repositories/prisma/prisma-user-repository';
import { CreateUserUseCase } from '@application/useCases/users/create-user-use-case';
import { SignInUseCase } from '@application/useCases/users/sign-in-use-case';
import { SignInController } from '@application/controllers/users/sign-in-controller';
import { PrismaMovieRepository } from '@infra/repositories/prisma/prisma-movie-repository';
import { CreateMovieUseCase } from '@application/useCases/movies/create-movie-use-case';
import { CreateMovieController } from '@application/controllers/movies/create-movie-controller';

export const container = Registry.getInstance();

container.register(PrismaUserRepository, PrismaUserRepository)
container.register(PrismaMovieRepository, PrismaMovieRepository);

container.register(CreateUserUseCase, CreateUserUseCase);
container.register(SignInUseCase, SignInUseCase);
container.register(CreateMovieUseCase, CreateMovieUseCase);

container.register(CreateUserController, CreateUserController);
container.register(SignInController, SignInController);
container.register(CreateMovieController, CreateMovieController);
