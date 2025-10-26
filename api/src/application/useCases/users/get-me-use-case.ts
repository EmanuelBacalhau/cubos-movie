import { User } from '@application/entities/user';
import { ResourceNotFound } from '@application/errors/application/resource-not-found';
import { PrismaUserRepository } from '@infra/repositories/prisma/prisma-user-repository';
import { Injectable } from '@kernel/decorators/injectable';

@Injectable()
export class GetMeUsecase {
	constructor(private readonly userRepository: PrismaUserRepository) {}

	async execute(data: GetMeUsecase.Request): Promise<GetMeUsecase.Response> {
		const existingUser = await this.userRepository.findById(data.id);

		if (!existingUser) {
			throw new ResourceNotFound('User not found');
		}

		return {
			id: existingUser.id,
			email: existingUser.email,
			name: existingUser.name,
		};
	}
}

export namespace GetMeUsecase {
	export interface Request {
		id: string;
	}

	export type Response = Omit<
		User.Attributes,
		'password' | 'createdAt' | 'updatedAt'
	>;
}
