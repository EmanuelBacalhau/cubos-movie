import { Movie } from '@application/entities/movie';
import { Conflict } from '@application/errors/application/conflict';
import { ResourceNotFound } from '@application/errors/application/resource-not-found';
import { Forbidden } from '@application/errors/http/forbidden';
import { PrismaMovieRepository } from '@infra/repositories/prisma/prisma-movie-repository';
import { Injectable } from '@kernel/decorators/injectable';

@Injectable()
export class UpdateMovieUseCase {
	constructor(private readonly movieRepository: PrismaMovieRepository) {}

	async execute(
		data: UpdateMovieUseCase.Request
	): Promise<UpdateMovieUseCase.Response> {
		const movie = await this.movieRepository.findById(data.id);

		if (!movie) {
			throw new ResourceNotFound('Movie not found.');
		}
		const isMatchingUser = movie.userId === data.userId;

		if (!isMatchingUser) {
			throw new Forbidden('You do not have permission to update this movie.');
		}

		if (data.title) {
			const existingMovie = await this.movieRepository.findByTitle(data.title);

			if (existingMovie && existingMovie.id !== data.id) {
				throw new Conflict('A movie with this title already exists.');
			}
		}

		await this.movieRepository.update(data);
	}
}

export namespace UpdateMovieUseCase {
	export interface Request extends Movie.UpdateInput {
		id: string;
		userId: string;
	}
	export type Response = void;
}
