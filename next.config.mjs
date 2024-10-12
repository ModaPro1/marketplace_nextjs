/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

if (typeof __dirname === 'undefined') {
  global.__dirname = new URL('.', import.meta.url).pathname;
}

export default nextConfig;
