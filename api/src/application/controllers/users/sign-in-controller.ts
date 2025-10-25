import { Controller } from '@application/contracts/http/controller';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';
import { CreateUserSchema } from './schemas/create-user-schema';
import { SignInUseCase } from '@application/useCases/users/sign-in-use-case';
import { signInSchema } from './schemas/sign-in-schema';

@Injectable()
@Schema(signInSchema)
export class SignInController extends Controller<'public', unknown> {
	constructor(private readonly signInUseCase: SignInUseCase) {
		super();
	}

	override async handle(
		request: Controller.Request<'public', CreateUserSchema>
	): Promise<Controller.Response<HelloController.Response>> {
		const response = await this.signInUseCase.execute(request.body);

		return {
			statusCode: 200,
			body: response,
		};
	}
}

export namespace HelloController {
	export type Response = {
    token: string;
  };
}
