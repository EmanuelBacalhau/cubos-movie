import {
	IMovieRepository,
	SearchMovieParams,
} from '@application/contracts/repositories/i-movie-repository';
import { Movie } from '@application/entities/movie';
import { prismaClient } from '@infra/clients/prisma';
import { Injectable } from '@kernel/decorators/injectable';

@Injectable()
export class PrismaMovieRepository implements IMovieRepository {
	async create(data: Movie.CreateInput): Promise<Movie> {
		const movie = await prismaClient.movie.create({
			data,
			include: {
				genre: true,
			},
		});

		return new Movie({ ...movie, genre: movie.genre.name }, movie.id);
	}

	async count(props: SearchMovieParams): Promise<number> {
		const total = await prismaClient.movie.count({
			where: {
				title: {
					contains: props.title,
					mode: 'insensitive',
				},
				genreId: props.genreId,
				duration: props.duration,
				releaseDate: {
					gte: props.realeseStartDate,
					lte: props.realeseEndDate,
				},
			},
		});
		return total;
	}

	async findById(id: string): Promise<Movie | null> {
		const movie = await prismaClient.movie.findUnique({
			where: { id },
		});

		return movie ? new Movie({ ...movie }, movie.id) : null;
	}

	async findByTitle(title: string): Promise<Movie | null> {
		const movie = await prismaClient.movie.findFirst({
			where: { title },
		});

		return movie ? new Movie({ ...movie }, movie.id) : null;
	}

	async find(props: SearchMovieParams): Promise<Movie[]> {
		const page = props.page || 1;
		const perPage = props.perPage || 10;

		const movies = await prismaClient.movie.findMany({
			skip: (page - 1) * perPage,
			take: 10,
			where: {
				title: {
					contains: props.title,
					mode: 'insensitive',
				},
				genreId: props.genreId,
				duration: props.duration,
				releaseDate: {
					gte: props.realeseStartDate,
					lte: props.realeseEndDate,
				},
			},
		});

		return movies.map(movie => new Movie({ ...movie }, movie.id));
	}

	async update({
		id,
		...movie
	}: PrismaMovieRepository.UpdateParams): Promise<void> {
		await prismaClient.movie.update({
			where: { id },
			data: {
				title: movie.title,
				description: movie.description,
				releaseDate: movie.releaseDate,
				budget: movie.budget,
				banner: movie.banner,
				trailerUrl: movie.trailerUrl,
				genreId: movie.genreId,
				updatedAt: new Date(),
			},
		});
	}

	async delete(id: string): Promise<void> {
		await prismaClient.movie.delete({
			where: { id },
		});
	}
}

export namespace PrismaMovieRepository {
	export type UpdateParams = Movie.UpdateInput & { id: string };
}
