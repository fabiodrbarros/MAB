/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output standalone para Docker — gera bundle minimal com node_modules incluído
  output: "standalone",

  images: {
    // Permite imagens locais e remotas
    remotePatterns: [],
  },

  // Compressão activa
  compress: true,

  // Headers de segurança básicos
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options",        value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy",        value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
