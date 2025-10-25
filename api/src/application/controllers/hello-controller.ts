import { Controller } from '@application/contracts/http/controller';
import { Injectable } from '@kernel/decorators/injectable';

@Injectable()
export class HelloController extends Controller<'private'> {
	override async handle(
		request: Controller.Request<'private', Record<string, unknown>>
	): Promise<Controller.Response<HelloController.Response>> {
		return {
			statusCode: 200,
			body: {
				message: {
					hello: 'world',
					accountId: request.accountId,
				},
			},
		};
	}
}

export namespace HelloController {
	export type Response = {
		message: Record<string, unknown>;
	};
}
