import { Controller } from '@application/contracts/http/controller';
import { User } from '@application/entities/user';
import { CreateUserUseCase } from '@application/useCases/users/create-user-use-case';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';
import {
	CreateUserSchema,
	createUserSchema,
} from './schemas/create-user-schema';

@Injectable()
@Schema(createUserSchema)
export class CreateUserController extends Controller<'public', unknown> {
	constructor(private readonly createUserUseCase: CreateUserUseCase) {
		super();
	}

	override async handle(
		request: Controller.Request<'public', CreateUserSchema>
	): Promise<Controller.Response<CreateUserController.Response>> {
		const response = await this.createUserUseCase.execute(request.body);

		return {
			statusCode: 201,
			body: response,
		};
	}
}

export namespace CreateUserController {
	export type Response = Omit<User, 'password'>;
}
