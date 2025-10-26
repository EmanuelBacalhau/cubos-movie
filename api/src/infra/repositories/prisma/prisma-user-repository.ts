import { IUserRepository } from '@application/contracts/repositories/i-user-repository';
import { User } from '@application/entities/user';
import { prismaClient } from '@infra/clients/prisma';
import { Injectable } from '@kernel/decorators/injectable';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
	async create(data: User.CreateInput): Promise<User> {
		const user = await prismaClient.user.create({
			data,
		});

		return new User({ ...user }, user.id);
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await prismaClient.user.findUnique({
			where: { email },
		});

		return user ? new User({ ...user }, user.id) : null;
	}

	async find(): Promise<Pick<User, 'id' | 'email' | 'name'>[]> {
		const users = await prismaClient.user.findMany({
			select: {
				id: true,
				email: true,
				name: true,
			},
		});

		return users;
	}
}
