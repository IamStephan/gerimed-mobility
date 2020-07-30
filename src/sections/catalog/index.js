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

      <div
        className={styles['content']}
      >
        <Typography
          className={styles['title']}
          variant='h4'
          color='primary'
        >
          {props.title}
        </Typography>

        <Typography
          className={styles['total']}
        >
          • {props.total} products
        </Typography>
      </div>
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
      <div
        className={styles['catalogContent']}
      >
        <GridItem
          title='Mobility'
          total='84'
        >
          <Img
            fluid={images.masks.childImageSharp.fluid}
            className={styles['img']}
          />
        </GridItem>

        <GridItem
          title='Appliances'
          total='685'
        >
          <Img
            fluid={images.mobility.childImageSharp.fluid}
            className={styles['img']}
          />
        </GridItem>

        <GridItem
          title='Commodes'
          total='50'
        >
          <Img
            fluid={images.mobility.childImageSharp.fluid}
            className={styles['img']}
          />
        </GridItem>

        <GridItem
          title='Grabrails'
          total='65'
        >
          <Img
            fluid={images.icu.childImageSharp.fluid}
            className={styles['img']}
          />
        </GridItem>

        <GridItem
          title='Seating'
          total='865'
        >
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
