import { Genre } from '@application/entities/genre';

export interface IGenreRepository {
	find(): Promise<Genre[]>;
}
