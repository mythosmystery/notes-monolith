const isProd = process.env.NODE_ENV === 'production';
const withPWA = require('next-pwa');
const { runtimeCaching } = require('next-pwa/cache');

/**
 * @type {import('next').NextConfig}
 **/

module.exports = withPWA({
   images: {
      loader: 'imgix',
      path: 'https://mythosmystery.github.io'
   },
   pwa: {
      dest: 'public',
      runtimeCaching,
      buildExcludes: [/middleware-manifest.json$/],
      register: true,
      skipWaiting: true,
      disable: process.env.NODE_ENV != 'production'
   }
});
