import { Controller } from '@application/contracts/http/controller';
import { SignInUseCase } from '@application/useCases/users/sign-in-use-case';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';
import { CreateUserSchema } from './schemas/create-user-schema';
import { signInSchema } from './schemas/sign-in-schema';

@Injectable()
@Schema(signInSchema)
export class SignInController extends Controller<'public', unknown> {
	constructor(private readonly signInUseCase: SignInUseCase) {
		super();
	}

	override async handle(
		request: Controller.Request<'public', CreateUserSchema>
	): Promise<Controller.Response<SignInController.Response>> {
		const response = await this.signInUseCase.execute(request.body);

		return {
			statusCode: 200,
			body: response,
		};
	}
}

export namespace SignInController {
	export type Response = {
		token: string;
	};
}
