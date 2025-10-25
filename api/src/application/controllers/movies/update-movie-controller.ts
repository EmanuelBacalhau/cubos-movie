import { Controller } from '@application/contracts/http/controller';
import { UpdateMovieUseCase } from '@application/useCases/movies/update-movie-use-case';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';
import {
	UpdateMovieSchema,
	updateMovieSchema,
} from './schemas/update-movie-schema';

@Injectable()
@Schema(updateMovieSchema)
export class UpdateMovieController extends Controller<'private', unknown> {
	constructor(private readonly updateMovieUseCase: UpdateMovieUseCase) {
		super();
	}

	override async handle(
		request: Controller.Request<'private', UpdateMovieSchema>
	): Promise<Controller.Response<CreateMovieController.Response>> {
		await this.updateMovieUseCase.execute({
			...request.body,
			userId: request.accountId,
		});

		return {
			statusCode: 204,
		};
	}
}

export namespace CreateMovieController {
	export type Response = null;
}
