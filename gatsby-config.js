module.exports = {
  siteMetadata: {
    title: `Gerimed Moility`,
    description: `Your one stop medical supply shop`,
    author: `Avvent Studio`,
    protocol: 'http',
    server: 'localhost',
    port: '1337'
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
    '@bumped-inc/gatsby-plugin-optional-chaining'
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
