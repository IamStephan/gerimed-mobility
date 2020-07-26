import React from 'react'

// Material
import { Typography, Button } from '@material-ui/core'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill' // <= Required for the position to work

// Styles
import styles from './styles.module.scss'

const Hero = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: {eq: "site/hero.png"}) {
        childImageSharp {
          fluid(maxWidth: 2000) {
            ...GatsbyImageSharpFluid
          } 
        }
      }
    }
  `)

  return (
    <div
      className={styles['hero']}
    >
      <div
        className={styles['imgContainer']}
      >
        <Img
          style={{
            minHeight: '75vh'
          }}
          objectPosition='left center'
          objectFit='cover'
          className={styles['img']}
          fluid={data.file.childImageSharp.fluid}
          alt='Woman sitting in a wheelchair, proudly'
          
        />
      </div>

      <div
        className={styles['heroContainer']}
      >
        <div
          className={styles['heroContent']}
        >
          <div
            className={styles['content']}
          >
            <Typography
              variant='h1'
              color='primary'
              style={{
                fontWeight: 'bold'
              }}
            >
              Aiding you, to live a better life.
            </Typography>
            <br />
            <Typography
              variant='h4'
              className={styles['subhead']}
            >
              Helping you live a normal life with exceptional quality tools and equipment.
            </Typography>
            <br />
            <div
              className={styles['callToAction']}
            >
              <Button
                variant='contained'
                color='primary'
                size='large'
              >
                Our Shop
              </Button>
              <Button
                variant='outlined'
                color='primary'
                size='large'
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero