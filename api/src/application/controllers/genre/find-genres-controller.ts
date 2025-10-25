import { Controller } from '@application/contracts/http/controller';
import { Genre } from '@application/entities/genre';
import { FindGenresUseCase } from '@application/useCases/genres/find-genres-use-case';
import { Injectable } from '@kernel/decorators/injectable';

@Injectable()
export class FindGenresController extends Controller<'private', unknown> {
	constructor(private readonly findGenreUseCase: FindGenresUseCase) {
		super();
	}

	override async handle(): Promise<
		Controller.Response<FindGenresController.Response>
	> {
		const response = await this.findGenreUseCase.execute();

		return {
			statusCode: 200,
			body: response,
		};
	}
}

export namespace FindGenresController {
	export type Response = Genre[];
}
