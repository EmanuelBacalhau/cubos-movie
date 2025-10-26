'use client';

import { LogOutIcon } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import logo from '../public/logo.png';
import { ThemeSwitcher } from './theme-switcher';
import { Button } from './ui/button';

export const Header = () => {
	const { signedIn, signOut } = useAuth();

	return (
		<header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm flex justify-between items-center h-14 px-6">
			<Image src={logo} alt="Logo Cubos Movies" />
			<div className="flex gap-4 items-center">
				<ThemeSwitcher />

				{signedIn && (
					<Button className="gap-2" onClick={signOut}>
						Sair <LogOutIcon className="size-4" />
					</Button>
				)}
			</div>
		</header>
	);
};
