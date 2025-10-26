import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { ApplicationProvier } from '@/providers/application-provider';

const roboto = Roboto({
	variable: '--font-roboto-sans',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Cubos Movies',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body
				className={`${roboto.variable} antialiased min-h-screen flex flex-col`}
			>
				<ApplicationProvier>
					<Header />
					<main className="container mx-auto flex flex-col flex-1">
						{children}
					</main>
				</ApplicationProvier>
			</body>
		</html>
	);
}
