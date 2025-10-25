import { ResourceNotFound } from '@application/errors/application/resource-not-found';
import { PrismaMovieRepository } from '@infra/repositories/prisma/prisma-movie-repository';
import { Injectable } from '@kernel/decorators/injectable';

@Injectable()
export class DeleteMovieUseCase {
	constructor(private readonly movieRepository: PrismaMovieRepository) {}

	async execute(
		data: DeleteMovieUseCase.Request
	): Promise<DeleteMovieUseCase.Response> {
		const movie = await this.movieRepository.findById(data.id);

		if (!movie) {
			throw new ResourceNotFound('Movie not found');
		}

		await this.movieRepository.delete(data.id);
	}
}

export namespace DeleteMovieUseCase {
	export type Request = {
		id: string;
	};
	export type Response = void;
}
