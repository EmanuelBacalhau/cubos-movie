import { Unauthorized } from '@application/errors/http/unauthorized';
import { PrismaUserRepository } from '@infra/repositories/prisma/prisma-user-repository';
import { Injectable } from '@kernel/decorators/injectable';
import { generateToken } from '@main/adaptares/fastify-jwt';
import { compareSync } from 'bcryptjs';

@Injectable()
export class SignInUseCase {
	constructor(private readonly userRepository: PrismaUserRepository) {}

	async execute(data: SignInUseCase.Request): Promise<SignInUseCase.Response> {
		const existingUser = await this.userRepository.findByEmail(data.email);

		if (!existingUser) {
			throw new Unauthorized();
		}

		const isPasswordValid = compareSync(data.password, existingUser.password);

		if (!isPasswordValid) {
			throw new Unauthorized();
		}

		const token = generateToken(existingUser.id);

		return { token };
	}
}

export namespace SignInUseCase {
	export interface Request {
		email: string;
		password: string;
	}

	export interface Response {
		token: string;
	}
}
