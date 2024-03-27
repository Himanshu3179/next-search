/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['www.resplashed.com'],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;