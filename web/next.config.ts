import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		domains: ['cubos-movies-bucket.s3.sa-east-1.amazonaws.com'],
	},
};

export default nextConfig;
