require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

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
        // Setting a color is optional.
        color: `#FFFF01`,
      },
    },
    '@bumped-inc/gatsby-plugin-optional-chaining',
    {
      resolve: `gatsby-source-graphql`,
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: `Custom`,
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: `backend`,
        // Url to query from
        url: `${process.env.PROTOCOL}://${process.env.SERVER}:${process.env.PORT}/graphql`,
        // Dev Testing
        //refetchInterval: 30
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
