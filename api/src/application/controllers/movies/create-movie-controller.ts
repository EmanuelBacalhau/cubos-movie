import { Controller } from '@application/contracts/http/controller';
import { CreateMovieUseCase } from '@application/useCases/movies/create-movie-use-case';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';
import {
	CreateMovieSchema,
	createMovieSchema,
} from './schemas/create-movie-schema';

@Injectable()
@Schema(createMovieSchema)
export class CreateMovieController extends Controller<'private', unknown> {
	constructor(private readonly createMovieUseCase: CreateMovieUseCase) {
		super();
	}

	override async handle(
		request: Controller.Request<'private', CreateMovieSchema>
	): Promise<Controller.Response<HelloController.Response>> {
		const response = await this.createMovieUseCase.execute({
			...request.body,
			userId: request.accountId,
		});

		return {
			statusCode: 201,
			body: response,
		};
	}
}

export namespace HelloController {
	export type Response = {
		uploadSignature: string;
	};
}
