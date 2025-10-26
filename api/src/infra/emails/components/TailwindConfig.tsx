import { Tailwind } from '@react-email/tailwind';
import React from 'react';

interface TailwindConfigProps {
	children: React.ReactNode;
}

export function TailwindConfig({ children }: TailwindConfigProps) {
	return (
		<Tailwind
			config={{
				theme: {
					extend: {
						colors: {
							'cubos-purple': '#18111b',
						},
					},
				},
			}}
		>
			{children}
		</Tailwind>
	);
}
