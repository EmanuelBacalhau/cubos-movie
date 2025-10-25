import { isInjectable } from '@kernel/decorators/injectable';
import { Constructor } from '@shared/types/constructor';
import { Token } from '@shared/types/token';

export class Registry {
	private readonly services: Map<Token, Constructor<any>> = new Map();
	private static instance: Registry;

	private constructor() {}

	public static getInstance(): Registry {
		if (!Registry.instance) {
			Registry.instance = new Registry();
		}

		return Registry.instance;
	}

	public register<T>(key: Token<T>, implementation: Constructor<T>) {
		if (this.services.has(key)) {
			throw new Error(`Service with key ${key} is already registered.`);
		}

		this.services.set(key, implementation);
	}

	public resolve<T>(key: Token<T>): T {
		const service = this.services.get(key);

		if (!service) {
			throw new Error(`Service with key ${key} is not registered.`);
		}

		if (!isInjectable(service)) {
			throw new Error(`Service with key ${key} is not injectable.`);
		}

		const paramTypes: Constructor<any>[] =
			Reflect.getMetadata('design:paramtypes', service) ?? [];

		const dependencies = paramTypes.map(contructor => {
			return this.resolve(contructor);
		});

		return new service(...dependencies);
	}
}
