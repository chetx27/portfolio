import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    transpilePackages: ['meshline'],
    images: {
        remotePatterns: [
            {
                hostname: 'www.google.com',
            },
        ],
    },
};

export default nextConfig;
