import { Genre } from '@application/entities/genre';
import { PrismaGenreRepository } from '@infra/repositories/prisma/prisma-genre-repository';
import { Injectable } from '@kernel/decorators/injectable';

@Injectable()
export class FindGenresUseCase {
	constructor(private readonly genreRepository: PrismaGenreRepository) {}

	async execute(): Promise<FindGenreUseCase.Response> {
		const genres = await this.genreRepository.find();
		return genres;
	}
}

export namespace FindGenreUseCase {
	export type Response = Genre[];
}
