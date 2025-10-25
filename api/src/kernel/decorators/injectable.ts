import { Constructor } from '@shared/types/constructor';

const INJECTABLE = 'di:injectable';

export function Injectable(): ClassDecorator {
	return target => Reflect.defineMetadata(INJECTABLE, true, target);
}

export function isInjectable(target: Constructor<any>): boolean {
	return !!Reflect.getMetadata(INJECTABLE, target);
}
