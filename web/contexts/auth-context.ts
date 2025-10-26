import { createContext, PropsWithChildren } from 'react';

export type AuthProviderProps = PropsWithChildren;

export type AuthContextValue = {
	signedIn: boolean;
	signIn: (accessToken: string) => void;
	signOut: () => void;
};

export const AuthContext = createContext<AuthContextValue>(
	{} as AuthContextValue
);
