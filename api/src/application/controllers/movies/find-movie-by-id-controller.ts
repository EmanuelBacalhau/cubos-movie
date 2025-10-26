import { Controller } from '@application/contracts/http/controller';
import { Movie } from '@application/entities/movie';
import { FindMovieByIdUseCase } from '@application/useCases/movies/find-movie-by-id-use-case';
import { Injectable } from '@kernel/decorators/injectable';
import { findMovieByIdSchema } from './schemas/find-movie-by-id-schema';

@Injectable()
export class FindMovieByIdController extends Controller<'private', unknown> {
	constructor(private readonly findMovieByIdUseCase: FindMovieByIdUseCase) {
		super();
	}

	override async handle(
		request: Controller.Request<'private'>
	): Promise<Controller.Response<FindMovieByIdMovieController.Response>> {
		const params = findMovieByIdSchema.parse(request.params);

		const movie = await this.findMovieByIdUseCase.execute(params);

		return {
			statusCode: 200,
			body: movie,
		};
	}
}

export namespace FindMovieByIdMovieController {
	export type Response = Movie.Attributes;
}
