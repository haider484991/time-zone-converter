

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['openweathermap.org'],
  },
  // other Next.js configurations
};

// Configure next-sitemap
export const sitemapConfig = {
  siteUrl: 'https://time-zone-converter-xi.vercel.app/', // Replace with your actual domain
  generateRobotsTxt: true, // Generates robots.txt file
};

export default nextConfig;
