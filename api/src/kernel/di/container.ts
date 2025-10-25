import { CreateMovieController } from '@application/controllers/movies/create-movie-controller';
import { UpdateMovieController } from '@application/controllers/movies/update-movie-controller';
import { CreateUserController } from '@application/controllers/users/create-user-controller';
import { SignInController } from '@application/controllers/users/sign-in-controller';
import { CreateMovieUseCase } from '@application/useCases/movies/create-movie-use-case';
import { UpdateMovieUseCase } from '@application/useCases/movies/update-movie-use-case';
import { CreateUserUseCase } from '@application/useCases/users/create-user-use-case';
import { SignInUseCase } from '@application/useCases/users/sign-in-use-case';
import { PrismaMovieRepository } from '@infra/repositories/prisma/prisma-movie-repository';
import { PrismaUserRepository } from '@infra/repositories/prisma/prisma-user-repository';
import { Registry } from './registry';

export const container = Registry.getInstance();

container.register(PrismaUserRepository, PrismaUserRepository);
container.register(PrismaMovieRepository, PrismaMovieRepository);

container.register(CreateUserUseCase, CreateUserUseCase);
container.register(SignInUseCase, SignInUseCase);
container.register(CreateMovieUseCase, CreateMovieUseCase);
container.register(UpdateMovieUseCase, UpdateMovieUseCase);

container.register(CreateUserController, CreateUserController);
container.register(SignInController, SignInController);
container.register(CreateMovieController, CreateMovieController);
container.register(UpdateMovieController, UpdateMovieController);
