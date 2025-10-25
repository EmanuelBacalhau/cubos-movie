import { Controller } from '@application/contracts/http/controller';
import { User } from '@application/entities/user';
import { CreateUserUseCase } from '@application/useCases/create-user-use-case';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';
import { CreateUserSchema, createUserSchema } from './schemas/create-user-schema';

@Injectable()
@Schema(createUserSchema)
export class CreateUserController extends Controller<'public', unknown> {
	constructor(private readonly createUserUseCase: CreateUserUseCase) {
		super();
	}

	override async handle(
		request: Controller.Request<'public', CreateUserSchema>
	): Promise<Controller.Response<HelloController.Response>> {

		const response = await this.createUserUseCase.execute(request.body);

		return {
			statusCode: 200,
			body: response,
		};
	}
}

export namespace HelloController {
	export type Response = Omit<User, 'password'>;
}
