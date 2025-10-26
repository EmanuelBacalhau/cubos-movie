import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { localStorageKeys } from '@/config/localstorage-keys';
import { AuthContext, AuthProviderProps } from '@/contexts/auth-context';
import { queryClient } from '@/lib/queryClient';
import { authService } from '@/services/auth-service';
import { httpClient } from '@/services/httpClient';

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const router = useRouter();

	const [signedIn, setSignedIn] = useState<boolean>(() => {
		const storedAccessToken = localStorage.getItem(localStorageKeys.AUTH_TOKEN);
		return !!storedAccessToken;
	});

	const { isError, isSuccess } = useQuery({
		queryKey: ['me'],
		queryFn: () => authService.me(),
		enabled: signedIn,
		staleTime: Infinity,
	});

	const signIn = useCallback((accessToken: string) => {
		localStorage.setItem(localStorageKeys.AUTH_TOKEN, accessToken);
		httpClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
		setSignedIn(true);
	}, []);

	const clearMeCache = useCallback(() => {
		queryClient.removeQueries({ queryKey: ['me'] });
	}, []);

	const signOut = useCallback(() => {
		localStorage.removeItem(localStorageKeys.AUTH_TOKEN);
		setSignedIn(true);
		clearMeCache();
		router.push('/');
	}, [router, clearMeCache]);

	useEffect(() => {
		if (isError) {
			signOut();
		}
	}, [isError, signOut]);

	return (
		<AuthContext.Provider
			value={{ signedIn: isSuccess && signedIn, signIn, signOut }}
		>
			{children}
		</AuthContext.Provider>
	);
};
