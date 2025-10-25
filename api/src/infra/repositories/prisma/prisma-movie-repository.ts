import { IMovieRepository, SearchMovieParams } from '@application/contracts/repositories/i-movie-repository';
import { Movie } from '@application/entities/movie';
import { prismaClient } from '@infra/clients/prisma';
import { Injectable } from '@kernel/decorators/injectable';

@Injectable()
export class PrismaMovieRepository implements IMovieRepository {
	async create(data: Movie.CreateInput): Promise<Movie> {
		const user = await prismaClient.movie.create({
			data,
		});

		return new Movie({ ...user }, user.id);
	}

  async findByTitle(title: string): Promise<Movie | null> {
    const movie = await prismaClient.movie.findFirst({
      where: { title },
    });

    return movie ? new Movie({ ...movie }, movie.id) : null;
  }

	async find(props: SearchMovieParams): Promise<Movie[]> {
		const users = await prismaClient.movie.findMany({
			skip: ((props.page || 1) - 1) * 10,
      take: 10,
      where: {
        title: {
          contains: props.title,
          mode: 'insensitive',
        },
        genreId: props.genderId,
        userId: props.userId,
        createdAt: {
          gt: props.createdAt,
        },
        releaseDate: {
          gt: props.realeseDate,
        },
      }
		});

		return users.map((user) => new Movie({ ...user }, user.id));
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
