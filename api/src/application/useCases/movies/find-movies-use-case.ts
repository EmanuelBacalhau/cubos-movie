import { SearchMovieParams } from '@application/contracts/repositories/i-movie-repository';
import { Movie } from '@application/entities/movie';
import { S3Gateway } from '@infra/gateways/s3-gateway';
import { PrismaMovieRepository } from '@infra/repositories/prisma/prisma-movie-repository';
import { Injectable } from '@kernel/decorators/injectable';
import { Pagination } from '@shared/types/pagination';

@Injectable()
export class FindMoviesUseCase {
	constructor(
		private readonly movieRepository: PrismaMovieRepository,
		private readonly s3Gateway: S3Gateway
	) {}

	async execute(
		data: FindMoviesUseCase.Request
	): Promise<FindMoviesUseCase.Response> {
		data.page = data.page || 1;
		data.perPage = data.perPage || 10;

		data.duration = data.duration ? data.duration * 60 : undefined;

		const movies = await this.movieRepository.find(data);

		const total = await this.movieRepository.count(data);
		const totalPages = Math.ceil(total / data.perPage);

		const moviesWithBannerUrl = await Promise.all(
			movies.map(async movie => ({
				...movie,
				banner: await this.s3Gateway.generatePresignedUrl({
					key: movie.banner,
				}),
				cover: await this.s3Gateway.generatePresignedUrl({
					key: movie.cover,
				}),
			}))
		);

		const response = moviesWithBannerUrl.map(movie => ({
			id: movie.id,
			banner: movie.banner,
			cover: movie.cover,
			votes: movie.votes,
			title: movie.title,
			genres: movie.genres,
		}));

		return {
			items: response,
			total,
			page: data.page,
			perPage: data.perPage,
			totalPages,
		};
	}
}

export namespace FindMoviesUseCase {
	export interface Request extends SearchMovieParams {}
	export type Response = Pagination<
		Pick<
			Movie.Attributes,
			'id' | 'banner' | 'cover' | 'votes' | 'title' | 'genres'
		>
	>;
}
