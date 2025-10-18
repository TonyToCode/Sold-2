import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true, // Для статического экспорта
  },
  output: 'export', // Включаем статический экспорт
  trailingSlash: true, // Добавляем слеш в конце путей
  distDir: 'out', // Папка для сборки (стандарт для GitHub Pages)
  basePath: process.env.NODE_ENV === 'production' ? '/Sold-2' : '', // Base path для нового репозитория
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Sold-2/' : '', // Asset prefix для ресурсов
};

export default nextConfig;
