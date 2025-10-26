import { Controller } from '@application/contracts/http/controller';
import { User } from '@application/entities/user';
import { GetMeUsecase } from '@application/useCases/users/get-me-use-case';
import { Injectable } from '@kernel/decorators/injectable';
import { CreateUserSchema } from './schemas/create-user-schema';

@Injectable()
export class GetMeController extends Controller<'private', unknown> {
	constructor(private readonly getMeUseCase: GetMeUsecase) {
		super();
	}

	override async handle(
		request: Controller.Request<'private', CreateUserSchema>
	): Promise<Controller.Response<GetMeController.Response>> {
		const response = await this.getMeUseCase.execute({
			id: request.accountId,
		});

		return {
			statusCode: 200,
			body: response,
		};
	}
}

export namespace GetMeController {
	export type Response = Omit<
		User.Attributes,
		'password' | 'createdAt' | 'updatedAt'
	>;
}
