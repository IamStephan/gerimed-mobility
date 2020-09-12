import React from 'react'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

// Templates
import { Section } from '../../templates/content_layout'

// Material
import { Typography } from '@material-ui/core'

// Styles
import styles from './styles.module.scss'

const STATIC_QUERY = graphql`
query {
  strapiFeaturedcategories {
    featuredCategory {
      category_one {
        description
        category {
          name
        }
        showcase {
          remoteImage {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }

      category_two {
        description
        category {
          name
        }
        showcase {
          remoteImage {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }

      category_three {
        description
        category {
          name
        }
        showcase {
          remoteImage {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }

      category_four {
        description
        category {
          name
        }
        showcase {
          remoteImage {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }

      category_five {
        description
        category {
          name
        }
        showcase {
          remoteImage {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
}
`

const GridItem = props => {
  const {
    children,
    title,
    description
  } = props

  return (
    <div
      className={styles['catalogItem']}
    >
      {children}

      <div
        className={styles['content']}
      >
        <Typography
          className={styles['title']}
          variant='h4'
          color='primary'
        >
          {title}
        </Typography>

        <Typography
          className={styles['description']}
        >
          {description}
        </Typography>
      </div>
    </div>
  )
}

const Catalog = () => {
  const {
    strapiFeaturedcategories: {
      featuredCategory: {
        category_one,
        category_two,
        category_three,
        category_four,
        category_five,
      }
    }
  } = useStaticQuery(STATIC_QUERY)

  return (
    <Section
      className={styles['catalogSection']}
    >
      <GridItem
        title={category_one.category.name}
        description={category_one.description}
      >
        <Img
          fluid={category_one.showcase.remoteImage.childImageSharp.fluid}
          className={styles['img']}
        />
      </GridItem>

      <GridItem
        title={category_two.category.name}
        description={category_two.description}
      >
        <Img
          fluid={category_two.showcase.remoteImage.childImageSharp.fluid}
          className={styles['img']}
        />
      </GridItem>

      <GridItem
        title={category_three.category.name}
        description={category_three.description}
      >
        <Img
          fluid={category_three.showcase.remoteImage.childImageSharp.fluid}
          className={styles['img']}
        />
      </GridItem>

      <GridItem
        title={category_four.category.name}
        description={category_four.description}
      >
        <Img
          fluid={category_four.showcase.remoteImage.childImageSharp.fluid}
          className={styles['img']}
        />
      </GridItem>

      <GridItem
        title={category_five.category.name}
        description={category_five.description}
      >
        <Img
          fluid={category_five.showcase.remoteImage.childImageSharp.fluid}
          className={styles['img']}
        />
      </GridItem>
    </Section>
  )
}

export default Catalog
