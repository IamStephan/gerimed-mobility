require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Gerimed Mobility`,
    description: `Your one stop medical supply shop`,
    author: `Stephan Burger`
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
        color: `#008835`,
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
            query: `
              query {
                featuredCategory {
                  category_one {
                    category {
                      name
                    }
                    description
                    showcase {
                      url
                    }
                  }
                  
                  category_two {
                    category {
                      name
                    }
                    description
                    showcase {
                      url
                    }
                  }
                  
                  category_three {
                    category {
                      name
                    }
                    description
                    showcase {
                      url
                    }
                  }
                  
                  category_four {
                    category {
                      name
                    }
                    description
                    showcase {
                      url
                    }
                  }
                  
                  category_five {
                    category {
                      name
                    }
                    description
                    showcase {
                      url
                    }
                  }
                }
              }
            `
          },
          {
            type: 'Categories',
            query: `
              query {
                categories(
                  sort: "name:asc"
                ) {
                  name
                  id
                  parent {
                    name
                    id
                  }
                }
              }
            `
          },
          {
            type: 'Legal',
            query: `
              query {
                termsAndCondition {
                  content
                  updatedAt
                }
                
                privacyPolicy {
                  content
                  updatedAt
                }
                
                returnPolicy {
                  content
                  updatedAt
                }
              }
            `
          },
          {
            type: 'FAQ',
            query: `
              query {
                frequentlyAskedQuestion {
                  faq_section {
                    section_name
                    questions {
                      question
                      answer
                    }
                  }
                }
              }
            `
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/profile/*`] },
    },
    `gatsby-plugin-netlify`
  ],
}
