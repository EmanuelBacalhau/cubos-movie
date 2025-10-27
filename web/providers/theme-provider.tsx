import { ThemeProviderProps } from 'next-themes';
import { useEffect, useState } from 'react';
import { Theme, ThemeProviderContext } from '@/contexts/theme-context';

export function ThemeProvider({
	children,
	defaultTheme = 'system',
	storageKey = 'vite-ui-theme',
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(() => defaultTheme as Theme);

	useEffect(() => {
		const storedTheme = localStorage.getItem(storageKey) as Theme | null;
		if (storedTheme) {
			setTheme(storedTheme);
		}
	}, [storageKey]);

	useEffect(() => {
		const root = window.document.documentElement;

		root.classList.remove('light', 'dark');

		if (theme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
				.matches
				? 'dark'
				: 'light';

			root.classList.add(systemTheme);
			return;
		}

		root.classList.add(theme);
	}, [theme]);

	const value = {
		theme,
		setTheme: (theme: Theme) => {
			localStorage.setItem(storageKey, theme);
			setTheme(theme);
		},
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}
