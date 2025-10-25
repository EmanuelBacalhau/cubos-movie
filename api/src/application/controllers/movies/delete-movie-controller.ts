import { Controller } from '@application/contracts/http/controller';
import { DeleteMovieUseCase } from '@application/useCases/movies/delete-movie-use-case';
import { Injectable } from '@kernel/decorators/injectable';
import { deleteMovieSchema } from './schemas/delete-movie-schema';
import { FindMoviesSchema } from './schemas/find-movies-schema';

@Injectable()
export class DeleteMovieController extends Controller<'private', unknown> {
	constructor(private readonly deleteMovieController: DeleteMovieUseCase) {
		super();
	}

	override async handle(
		request: Controller.Request<'private', FindMoviesSchema>
	): Promise<Controller.Response<DeleteMovieController.Response>> {
		const params = deleteMovieSchema.parse(request.params);

		await this.deleteMovieController.execute(params);

		return {
			statusCode: 204,
		};
	}
}

export namespace DeleteMovieController {
	export type Response = null;
}
