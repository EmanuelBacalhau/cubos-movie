import {
	IMovieRepository,
	SearchMovieParams,
} from '@application/contracts/repositories/i-movie-repository';
import { Movie } from '@application/entities/movie';
import { prismaClient } from '@infra/clients/prisma';
import { Injectable } from '@kernel/decorators/injectable';

@Injectable()
export class PrismaMovieRepository implements IMovieRepository {
	async create(data: Movie.CreateInput): Promise<Movie.Attributes> {
		const { genres, ...movieData } = data;

		const movie = await prismaClient.movie.create({
			data: {
				...movieData,
				genres: {
					create: genres.map((genreId: string) => ({
						genre: { connect: { id: genreId } },
					})),
				},
			},
			include: {
				genres: {
					include: {
						genre: true,
					},
				},
			},
		});

		return {
			...movie,
			genres:
				movie.genres?.map(g => ({
					id: g.genre.id,
					name: g.genre.name,
				})) ?? [],
		};
	}

	async count(props: SearchMovieParams): Promise<number> {
		const where: any = {};

		if (props.title) {
			where.title = {
				contains: props.title,
				mode: 'insensitive',
			};
		}
		if (props.genreId) {
			where.genres = { some: { genreId: props.genreId } };
		}
		if (props.duration) {
			where.duration = props.duration;
		}
		if (props.realeseStartDate || props.realeseEndDate) {
			where.releaseDate = {};
			if (props.realeseStartDate)
				where.releaseDate.gte = props.realeseStartDate;
			if (props.realeseEndDate) where.releaseDate.lte = props.realeseEndDate;
		}

		const total = await prismaClient.movie.count({
			where,
		});
		return total;
	}

	async findById(id: string): Promise<Movie.Attributes | null> {
		const movie = await prismaClient.movie.findUnique({
			where: { id },
			include: {
				genres: {
					include: {
						genre: true,
					},
				},
			},
		});

		if (!movie) {
			return null;
		}

		return {
			...movie,
			genres:
				movie.genres?.map(g => ({
					id: g.genre.id,
					name: g.genre.name,
				})) ?? [],
		};
	}

	async findByTitle(title: string): Promise<Movie | null> {
		const movie = await prismaClient.movie.findFirst({
			where: { title },
		});

		return movie ? new Movie({ ...movie }, movie.id) : null;
	}

	async find(props: SearchMovieParams): Promise<Movie.Attributes[]> {
		const page = props.page || 1;
		const perPage = props.perPage || 10;

		const where: any = {};

		if (props.title) {
			where.title = {
				contains: props.title,
				mode: 'insensitive',
			};
		}
		if (props.genreId) {
			where.genres = { some: { genreId: props.genreId } };
		}
		if (props.duration) {
			where.duration = props.duration;
		}
		if (props.realeseStartDate || props.realeseEndDate) {
			where.releaseDate = {};
			if (props.realeseStartDate)
				where.releaseDate.gte = props.realeseStartDate;
			if (props.realeseEndDate) where.releaseDate.lte = props.realeseEndDate;
		}

		const movies = await prismaClient.movie.findMany({
			skip: (page - 1) * perPage,
			take: perPage,
			where,
			include: {
				genres: {
					include: {
						genre: true,
					},
				},
			},
		});

		return movies.map(movie => ({
			...movie,
			genres:
				movie.genres?.map(g => ({
					id: g.genre.id,
					name: g.genre.name,
				})) ?? [],
		}));
	}

	async update({
		id,
		...movie
	}: PrismaMovieRepository.UpdateParams): Promise<void> {
		await prismaClient.$transaction(async tx => {
			await tx.genreMovie.deleteMany({
				where: { movieId: id },
			});

			const newGenres = (movie.genres ?? []).map((genreId: string) => ({
				movieId: id,
				genreId: genreId,
			}));

			if (newGenres.length > 0) {
				await tx.genreMovie.createMany({
					data: newGenres,
				});
			}

			await tx.movie.update({
				where: { id },
				data: {
					title: movie.title,
					description: movie.description,
					releaseDate: movie.releaseDate,
					budget: movie.budget,
					duration: movie.duration,
					banner: movie.banner,
					cover: movie.cover,
					profit: movie.profit,
					trailerUrl: movie.trailerUrl,
					revenue: movie.revenue,
					language: movie.language,
					votes: movie.votes,
					updatedAt: new Date(),
					originalTitle: movie.originalTitle,
					rating: movie.rating,
				},
			});
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
