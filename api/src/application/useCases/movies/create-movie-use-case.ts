import { Movie } from '@application/entities/movie';
import { Conflict } from '@application/errors/application/conflict';
import { PrismaMovieRepository } from '@infra/repositories/prisma/prisma-movie-repository';
import { Injectable } from '@kernel/decorators/injectable';

@Injectable()
export class CreateMovieUseCase {
  constructor(private readonly movieRepository: PrismaMovieRepository) {}

  async execute(data: Movie.CreateInput): Promise<CreateMovieUseCase.Response> {
    const existingMovie = await this.movieRepository.findByTitle(data.title);

    if (existingMovie) {
      throw new Conflict("A movie with this title already exists.");
    }

    const movie = await this.movieRepository.create(data);

    return movie;
  }
}

export namespace CreateMovieUseCase {
  export type Response = Movie;
}
