const A15JsService = require('a15-js-service').default;

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
      '~/assets/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
      '~/plugins/a15-js-service',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  server: {
      port: 9031,
  },
  serverMiddleware: [
      '~/server/context-path',
  ],
  router: {
      middleware: [
          'echo-context-path',
      ],
  },
  generate: {
      async routes() {
          console.log(A15JsService);
          const a15Svc = new A15JsService({
              host: '',
              siteId: 'an-us',
              currency: 'USD',
              language: 'en-US',
          });
          const routes = [];
          const categories = ['dresses', 'jackets-coats', 'tops'];
          categories.forEach(c => routes.push(`/category/${c}`));

          const catData = await Promise.all(categories.map((slug) => {
              const url = `/catalog/v2/{siteId}/pools/US_DIRECT/navigation-items/${slug}/products`;
              return a15Svc.a15Client.get(url);
          }));

          const tiles = catData
              .map(data => data.records)
              .reduce((acc, records) => acc.concat(records), [])
              .map(record => record.allMeta.tile)
              .forEach(tile => routes.push(`/shop/${tile.product.productSlug}`));

          return routes;
      },
  }
}
