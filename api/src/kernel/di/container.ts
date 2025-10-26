import { FindGenresController } from '@application/controllers/genre/find-genres-controller';
import { CreateMovieController } from '@application/controllers/movies/create-movie-controller';
import { DeleteMovieController } from '@application/controllers/movies/delete-movie-controller';
import { FindMoviesController } from '@application/controllers/movies/find-movies-controller';
import { UpdateMovieController } from '@application/controllers/movies/update-movie-controller';
import { CreateUserController } from '@application/controllers/users/create-user-controller';
import { SignInController } from '@application/controllers/users/sign-in-controller';
import { FindGenresUseCase } from '@application/useCases/genres/find-genres-use-case';
import { CreateMovieUseCase } from '@application/useCases/movies/create-movie-use-case';
import { DeleteMovieUseCase } from '@application/useCases/movies/delete-movie-use-case';
import { FindMovieUseCase } from '@application/useCases/movies/find-movies-use-case';
import { UpdateMovieUseCase } from '@application/useCases/movies/update-movie-use-case';
import { CreateUserUseCase } from '@application/useCases/users/create-user-use-case';
import { SignInUseCase } from '@application/useCases/users/sign-in-use-case';
import { SESGateway } from '@infra/gateways/ses-gateway';
import { PrismaGenreRepository } from '@infra/repositories/prisma/prisma-genre-repository';
import { PrismaMovieRepository } from '@infra/repositories/prisma/prisma-movie-repository';
import { PrismaUserRepository } from '@infra/repositories/prisma/prisma-user-repository';
import { Registry } from './registry';

export const container = Registry.getInstance();

container.register(SESGateway, SESGateway);

container.register(PrismaUserRepository, PrismaUserRepository);
container.register(PrismaMovieRepository, PrismaMovieRepository);
container.register(PrismaGenreRepository, PrismaGenreRepository);

container.register(CreateUserUseCase, CreateUserUseCase);
container.register(SignInUseCase, SignInUseCase);
container.register(CreateMovieUseCase, CreateMovieUseCase);
container.register(UpdateMovieUseCase, UpdateMovieUseCase);
container.register(FindMovieUseCase, FindMovieUseCase);
container.register(DeleteMovieUseCase, DeleteMovieUseCase);
container.register(FindGenresUseCase, FindGenresUseCase);

container.register(CreateUserController, CreateUserController);
container.register(SignInController, SignInController);
container.register(CreateMovieController, CreateMovieController);
container.register(UpdateMovieController, UpdateMovieController);
container.register(FindMoviesController, FindMoviesController);
container.register(DeleteMovieController, DeleteMovieController);
container.register(FindGenresController, FindGenresController);
