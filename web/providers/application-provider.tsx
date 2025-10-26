'use client';

import { PropsWithChildren } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from './auth-provider';
import TanstackQueryProvider from './tanstack-query-provider';
import { ThemeProvider } from './theme-provider';

export const ApplicationProvier = ({ children }: PropsWithChildren) => {
	return (
		<TanstackQueryProvider>
			<ThemeProvider>
				<AuthProvider>{children}</AuthProvider>
				<Toaster />
			</ThemeProvider>
		</TanstackQueryProvider>
	);
};
