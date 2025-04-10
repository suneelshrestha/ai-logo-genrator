import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  // You can add other options below if needed
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
