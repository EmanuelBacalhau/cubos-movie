import { Controller } from '@application/contracts/http/controller';
import { Movie } from '@application/entities/movie';
import { FindMovieUseCase } from '@application/useCases/movies/find-movies-use-case';
import { Injectable } from '@kernel/decorators/injectable';
import { Pagination } from '@shared/types/pagination';
import {
	FindMoviesSchema,
	findMoviesSchema,
} from './schemas/find-movies-schema';

@Injectable()
export class FindMoviesController extends Controller<'private', unknown> {
	constructor(private readonly findMoviesUseCase: FindMovieUseCase) {
		super();
	}

	override async handle(
		request: Controller.Request<'private', FindMoviesSchema>
	): Promise<Controller.Response<FindMoviesController.Response>> {
		const queryParams = findMoviesSchema.parse(request.queryParams);

		const movies = await this.findMoviesUseCase.execute(queryParams);

		return {
			statusCode: 200,
			body: movies,
		};
	}
}

export namespace FindMoviesController {
	export type Response = Pagination<Movie>;
}
