import { Movie } from '@application/entities/movie';
import { Conflict } from '@application/errors/application/conflict';
import NewMovieEmail from '@infra/emails/templates/NewMovie';
import { S3Gateway } from '@infra/gateways/s3-gateway';
import { SESGateway } from '@infra/gateways/ses-gateway';
import { PrismaMovieRepository } from '@infra/repositories/prisma/prisma-movie-repository';
import { PrismaUserRepository } from '@infra/repositories/prisma/prisma-user-repository';
import { Injectable } from '@kernel/decorators/injectable';
import { render } from '@react-email/components';

@Injectable()
export class CreateMovieUseCase {
	constructor(
		private readonly movieRepository: PrismaMovieRepository,
		private readonly userRepository: PrismaUserRepository,
		private readonly sesGateway: SESGateway,
		private readonly s3Gateway: S3Gateway
	) {}

	async execute(
		data: CreateMovieUseCase.Request
	): Promise<CreateMovieUseCase.Response> {
		const existingMovie = await this.movieRepository.findByTitle(data.title);

		if (existingMovie) {
			throw new Conflict('A movie with this title already exists.');
		}

		data.duration = data.duration * 60;

		const { file, ...movieData } = data;

		const fileKey = S3Gateway.generateInputFileKey({
			inputType: file.inputType,
		});

		const movie = await this.movieRepository.create({
			...movieData,
			banner: fileKey,
		});

		if (movie.releaseDate > new Date()) {
			await this.sendNewMovieEmail(movie);
		}

		const { uploadSignature } = await this.s3Gateway.createPOST({
			file: {
				key: fileKey,
				size: data.file.size,
				inputType: data.file.inputType,
			},
		});

		return {
			uploadSignature,
		};
	}

	private async sendNewMovieEmail(movie: Movie) {
		const users = await this.userRepository.find();

		const url = await this.s3Gateway.generatePresignedUrl({
			key: movie.banner,
		});

		movie.banner = url;

		users.forEach(async user => {
			const [userFirstName] = user.name.split(' ');

			await this.sesGateway.sendEmail({
				from: process.env.EMAIL as string,
				to: [user.email],
				subject: `Novo filme adicionado: ${movie.title}`,
				template: await render(
					NewMovieEmail({
						userFirstName,
						movie: {
							title: movie.title,
							description: movie.description,
							pageUrl: 'localhost:3000/movies/' + movie.id,
							releaseDate: movie.releaseDate,
							banner: movie.banner,
							duration: movie.duration,
							genre: movie.genreStr,
						},
					})
				),
			});
		});
	}
}

export namespace CreateMovieUseCase {
	export type Request = Omit<Movie.CreateInput, 'banner'> & {
		file: {
			size: number;
			inputType: string;
		};
	};

	export type Response = {
		uploadSignature: string;
	};
}
