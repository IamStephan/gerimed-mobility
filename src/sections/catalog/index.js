import React from 'react'

// Gatsby
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

// Material
import { Typography } from '@material-ui/core'

// Styles
import styles from './styles.module.scss'

const GridItem = props => {
  return (
    <div
      className={styles['catalogItem']}
    >
      {props.children}
    </div>
  )
}

const Catalog = () => {
  const images = useStaticQuery(graphql`
    query {
      masks: file(relativePath: {eq: "gallery/catalog/masks2.jpg"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          } 
        }
      }

      appliances: file(relativePath: {eq: "gallery/catalog/bathAid.jpg"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          } 
        }
      }

      icu: file(relativePath: {eq: "gallery/catalog/icu.jpg"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          } 
        }
      }

      mobility: file(relativePath: {eq: "gallery/catalog/mobility.jpg"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          } 
        }
      }
    }
  `)

  return (
    <section
      className={styles['catalogContainer']}
    >
      <Typography
        variant='h2'
        className={styles['title']}
      >
        Our Catalog
      </Typography>

      <div
        className={styles['catalogContent']}
      >
        <GridItem>
          <Img
            fluid={images.masks.childImageSharp.fluid}
            className={styles['img']}
          />
        </GridItem>

        <GridItem>
          <Img
            fluid={images.mobility.childImageSharp.fluid}
            className={styles['img']}
          />
        </GridItem>

        <GridItem>
          <Img
            fluid={images.mobility.childImageSharp.fluid}
            className={styles['img']}
          />
        </GridItem>

        <GridItem>
          <Img
            fluid={images.icu.childImageSharp.fluid}
            className={styles['img']}
          />
        </GridItem>
      </div>
    </section>
  )
}

export default Catalog
