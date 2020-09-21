require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const FEATURED_CATEGORIES = require('./strapi_graphql_queries/featured_categories')

module.exports = {
  siteMetadata: {
    title: `Gerimed Moility`,
    description: `Your one stop medical supply shop`,
    author: `Avvent Studio`,
    protocol: process.env.PROTOCOL,
    server: process.env.SERVER,
    port: process.env.PORT
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true
        }
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /svg/
        }
      }
    },
    {
      resolve: 'gatsby-plugin-load-script',
      options: {
        src: 'https://checkout.flutterwave.com/v3.js',
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gerimed Mobility`,
        short_name: `Mobility`,
        start_url: `/`,
        background_color: `#008835`,
        theme_color: `#008835`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#FFFF01`,
      },
    },
    '@bumped-inc/gatsby-plugin-optional-chaining',
    {
      resolve: 'gatsby-source-strapi-extended',
      options: {
        apiURL: process.env.GATSBY_API_URL,
        queryLimit: 1000, // Default to 100
        // contentTypes: [`article`, `user`],
        // //If using single types place them in this array.
        // singleTypes: [`home-page`, `contact`],
        graphqlTypes: [
          {
            type: 'Featuredcategories',
            query: require('./strapi_graphql_queries/featured_categories')
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/profile/*`, '/profile'] },
    }
  ],
}
