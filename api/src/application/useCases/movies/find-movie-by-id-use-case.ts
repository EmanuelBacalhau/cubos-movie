import { Movie } from '@application/entities/movie';
import { ResourceNotFound } from '@application/errors/application/resource-not-found';
import { S3Gateway } from '@infra/gateways/s3-gateway';
import { PrismaMovieRepository } from '@infra/repositories/prisma/prisma-movie-repository';
import { Injectable } from '@kernel/decorators/injectable';

@Injectable()
export class FindMovieByIdUseCase {
	constructor(
		private readonly movieRepository: PrismaMovieRepository,
		private readonly s3Gateway: S3Gateway
	) {}

	async execute(
		data: FindMovieUseCase.Request
	): Promise<FindMovieUseCase.Response> {
		const movie = await this.movieRepository.findById(data.id);

		if (!movie) {
			throw new ResourceNotFound('Movie not found');
		}

		movie.banner = await this.s3Gateway.generatePresignedUrl({
			key: movie.banner,
		});

		movie.cover = await this.s3Gateway.generatePresignedUrl({
			key: movie.cover,
		});

		return movie;
	}
}

export namespace FindMovieUseCase {
	export interface Request {
		id: string;
	}
	export type Response = Movie.Attributes;
}
