import { HelloController } from '@application/controllers/hello-controller';
import { Registry } from './registry';

export const container = Registry.getInstance();

container.register(HelloController, HelloController);
