import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { useCallback, useEffect, useState } from 'react';
import { localStorageKeys } from '@/config/localstorage-keys';
import { AuthContext, AuthProviderProps } from '@/contexts/auth-context';
import { queryClient } from '@/lib/queryClient';
import { authService } from '@/services/auth-service';
import { httpClient } from '@/services/httpClient';

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const router = useRouter();

	const [signedIn, setSignedIn] = useState<boolean>(() => {
		const cookies = parseCookies();
		const storedAccessToken = cookies[localStorageKeys.AUTH_TOKEN];
		return !!storedAccessToken;
	});

	const { isError, isSuccess } = useQuery({
		queryKey: ['me'],
		queryFn: () => authService.me(),
		enabled: signedIn,
		staleTime: Infinity,
	});

	const signIn = useCallback(
		(accessToken: string) => {
			const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7;
			setCookie(null, localStorageKeys.AUTH_TOKEN, accessToken, {
				path: '/',
				maxAge: SEVEN_DAYS_IN_SECONDS,
			});
			httpClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
			setSignedIn(true);
			router.push('/');
		},
		[router]
	);

	const clearMeCache = useCallback(() => {
		queryClient.removeQueries({ queryKey: ['me'] });
	}, []);

	const signOut = useCallback(() => {
		destroyCookie(null, localStorageKeys.AUTH_TOKEN, { path: '/' });
		setSignedIn(false);
		clearMeCache();
		router.push('/sign-in');
	}, [router, clearMeCache]);

	useEffect(() => {
		if (isError) {
			signOut();
		}
	}, [isError, signOut]);

	return (
		<AuthContext.Provider
			value={{ signedIn: signedIn && isSuccess, signIn, signOut }}
		>
			{children}
		</AuthContext.Provider>
	);
};
