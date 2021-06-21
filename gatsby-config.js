require('dotenv-defaults/config');

module.exports = {
  siteMetadata: {
    title: 'My Website',
    description: 'My Website',
    url: process.env.BASE_URL,
    siteUrl: process.env.BASE_URL,
    image: 'images/banner.jpg',
    logo: 'images/logo.png',
  },
  plugins: [
    // code
    'gatsby-plugin-typescript',
    // style & design system
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    'gatsby-plugin-emotion',
    // assets
    'gatsby-image',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-svgr',
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#161925',
        showSpinner: false,
      },
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {},
    },
    // data source
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content/`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: process.env.PRISMIC_REPO_NAME,
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        schemas: {
          article: require('./src/utils/prismic-schemas/article.json'),
        },
      },
    },
    // SEO & marketing
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-react-helmet-async',
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: process.env.GTM_ID,
        includeInDevelopment: false,
        routeChangeEventName: 'page-route-changed',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Al Amanah`,
        short_name: `Al Amanah`,
        description: `Yayasan Al Amanah`,
        lang: `en`,
        display: `standalone`,
        icon: `src/content/images/logo.png`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#fff`,
        icons: [
          {
            src: `/static/images/logo.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/static/images/logo.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ], // Add or remove icon sizes as desired
      },
    },
  ],
};
