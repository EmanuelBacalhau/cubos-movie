import { getSchema } from '@kernel/decorators/schema';

type TRouteType = 'public' | 'private';

export abstract class Controller<TType extends TRouteType, TBody = unknown> {
	protected abstract handle(
		request: Controller.Request<TType>
	): Promise<Controller.Response<TBody>>;

	public execute(
		request: Controller.Request<TType>
	): Promise<Controller.Response<TBody>> {
		const body = this.parsedBody(request.body);
		return this.handle({ ...request, body });
	}

	private parsedBody(body: Controller.Request<TType>['body']) {
		const schema = getSchema(this.constructor);

		if (schema) {
			return schema.parse(body);
		}

		return body;
	}
}

export namespace Controller {
	type BaseRequest<
		TBody = Record<string, unknown>,
		TParams = Record<string, unknown>,
		TQueryParams = Record<string, unknown>,
	> = {
		body: TBody;
		params: TParams;
		queryParams: TQueryParams;
	};

	type PublicRequest<
		TBody = Record<string, unknown>,
		TParams = Record<string, unknown>,
		TQueryParams = Record<string, unknown>,
	> = BaseRequest<TBody, TParams, TQueryParams> & {
		accountId: null;
	};

	type PrivatecRequest<
		TBody = Record<string, unknown>,
		TParams = Record<string, unknown>,
		TQueryParams = Record<string, unknown>,
	> = BaseRequest<TBody, TParams, TQueryParams> & {
		accountId: string;
	};

	export type Request<
		TType extends TRouteType = 'public',
		TBody = Record<string, unknown>,
		TParams = Record<string, unknown>,
		TQueryParams = Record<string, unknown>,
	> = TType extends 'public'
		? PublicRequest<TBody, TParams, TQueryParams>
		: PrivatecRequest<TBody, TParams, TQueryParams>;

	export type Response<TBody = undefined> = {
		statusCode: number;
		body?: TBody;
	};
}
