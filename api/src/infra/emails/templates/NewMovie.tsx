import {
	Body,
	Button,
	Column,
	Container,
	Head,
	Heading,
	Html,
	Img,
	Row,
	Section,
	Text,
} from '@react-email/components';
import React from 'react';
import { TailwindConfig } from '../components/TailwindConfig';

interface NewMovieEmailProps {
	userFirstName: string;
	movie: {
		title: string;
		banner: string;
		description: string;
		duration: number;
		releaseDate: Date;
		genre: string;
		pageUrl: string;
	};
}

export const NewMovieEmail = ({ userFirstName, movie }: NewMovieEmailProps) => {
	return (
		<Html>
			<Head />
			<TailwindConfig>
				<Body>
					<Container>
						<Section>
							<Row>
								<Img
									className="w-full"
									width={620}
									src={movie.banner}
									alt={movie.title}
								/>
							</Row>

							<Row className="p-6">
								<Column>
									<Heading className="text-center text-3xl">
										Olá {userFirstName},
									</Heading>

									<Text className="text-center text-2xl">
										Temos uma ótima notícia! O filme <b>{movie.title}</b> foi
										recentemente adicionado ao nosso catálogo.
									</Text>

									<Text>
										<b>Descrição: </b>
										{movie.description}
									</Text>

									<Text>
										<b>Data de Lançamento: </b>
										{movie.releaseDate.toLocaleDateString('pt-BR', {
											day: '2-digit',
											month: 'long',
											year: 'numeric',
										})}
									</Text>

									<Text>
										<b>Gender: </b>
										{movie.genre}
									</Text>

									<Text>
										<b>Duration: </b>
										{Math.ceil(movie.duration / 60)}h {movie.duration % 60}m
									</Text>

									<Text className="text-center">
										Acesse o link a seguir para assistir ao trailer:
									</Text>

									<Section className="my-4 mx-auto text-center">
										<Button
											href={movie.pageUrl}
											className="bg-cubos-purple px-4 py-2 text-white rounded-md"
										>
											Assistir Trailer
										</Button>
									</Section>
								</Column>
							</Row>
						</Section>

						<Text className="text-center text-sm text-black/50 my-4">
							&copy; {new Date().getFullYear()} Cubos Movies. Todos os direitos
							reservados.
						</Text>
					</Container>
				</Body>
			</TailwindConfig>
		</Html>
	);
};

NewMovieEmail.PreviewProps = {
	userFirstName: 'Alan',
	movie: {
		title: 'Inception',
		description: 'A mind-bending thriller about dream invasion.',
		releaseDate: new Date('2010-07-16'),
		duration: 148,
		banner: 'https://pbs.twimg.com/media/Fyl44dRXwAEkTa0?format=jpg&name=small',
		genre: 'Science Fiction',
	},
} as NewMovieEmailProps;

export default NewMovieEmail;
