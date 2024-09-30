// next-sitemap.js
const { createSitemap } = require('next-sitemap');

module.exports = createSitemap({
  siteUrl: 'https://time-zone-converter-xi.vercel.app/', // Replace with your actual domain
  generateRobotsTxt: true, // Generate robots.txt file
  changefreq: 'daily', // Change frequency of the sitemap
  priority: 0.7, // Default priority
  // You can add other options as needed
});
