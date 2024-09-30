const sitemap = require('nextjs-sitemap-generator');

sitemap({
  baseURL: 'https://time-zone-converter-xi.vercel.app', // Your site's URL
  pagesDirectory: `${__dirname}/src/app/`, // Path to your pages directory
  targetDirectory: '', // Where to output the sitemap
  sitemapFilename: 'sitemap.xml', // Name of the generated sitemap file
  ignoredPaths: ['api/*'], // Paths to ignore
});
