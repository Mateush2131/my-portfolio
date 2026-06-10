const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },   // Игнорируем TS ошибки
  eslint: { ignoreDuringBuilds: true },      // Игнорируем ESLint
};