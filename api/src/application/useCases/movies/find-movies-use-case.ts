import { SearchMovieParams } from '@application/contracts/repositories/i-movie-repository';
import { Movie } from '@application/entities/movie';
import { PrismaMovieRepository } from '@infra/repositories/prisma/prisma-movie-repository';
import { Injectable } from '@kernel/decorators/injectable';
import { Pagination } from '@shared/types/pagination';

@Injectable()
export class FindMovieUseCase {
	constructor(private readonly movieRepository: PrismaMovieRepository) {}

	async execute(
		data: FindMovieUseCase.Request
	): Promise<FindMovieUseCase.Response> {
		data.page = data.page || 1;
		data.perPage = data.perPage || 10;

		data.duration = data.duration ? data.duration * 60 : undefined;

		const movies = await this.movieRepository.find(data);

		const total = await this.movieRepository.count(data);
		const totalPages = Math.ceil(total / data.perPage);

		return {
			items: movies,
			total,
			page: data.page,
			perPage: data.perPage,
			totalPages,
		};
	}
}

export namespace FindMovieUseCase {
	export interface Request extends SearchMovieParams {}
	export type Response = Pagination<Movie>;
}
