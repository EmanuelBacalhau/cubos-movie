import { IGenreRepository } from '@application/contracts/repositories/i-genre-repository';
import { Genre } from '@application/entities/genre';
import { prismaClient } from '@infra/clients/prisma';
import { Injectable } from '@kernel/decorators/injectable';

@Injectable()
export class PrismaGenreRepository implements IGenreRepository {
	async find(): Promise<Genre[]> {
		const genres = await prismaClient.genre.findMany();
		return genres.map(genre => new Genre({ ...genre }, genre.id));
	}
}
