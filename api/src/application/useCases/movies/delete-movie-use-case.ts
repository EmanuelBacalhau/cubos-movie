import { ResourceNotFound } from '@application/errors/application/resource-not-found';
import { Forbidden } from '@application/errors/http/forbidden';
import { S3Gateway } from '@infra/gateways/s3-gateway';
import { PrismaMovieRepository } from '@infra/repositories/prisma/prisma-movie-repository';
import { Injectable } from '@kernel/decorators/injectable';

@Injectable()
export class DeleteMovieUseCase {
	constructor(
		private readonly movieRepository: PrismaMovieRepository,
		private readonly s3Gateway: S3Gateway
	) {}

	async execute(
		data: DeleteMovieUseCase.Request
	): Promise<DeleteMovieUseCase.Response> {
		const movie = await this.movieRepository.findById(data.id);

		if (!movie) {
			throw new ResourceNotFound('Movie not found');
		}

		if (movie.userId !== data.userId) {
			throw new Forbidden('You do not have permission to delete this movie.');
		}

		await this.s3Gateway.deleteFile({ key: movie.banner });

		await this.movieRepository.delete(data.id);
	}
}

export namespace DeleteMovieUseCase {
	export type Request = {
		id: string;
		userId: string;
	};
	export type Response = void;
}
