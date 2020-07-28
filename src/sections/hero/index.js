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
      file(relativePath: {eq: "site/hero-2.png"}) {
        childImageSharp {
          fluid(maxWidth: 2000) {
            ...GatsbyImageSharpFluid
          } 
        }
      }
    }
  `)

  return (
    <section
      className={styles['hero']}
    >
      <div
        className={styles['imgContainer']}
      >
        <Img
          objectPosition='left center'
          objectFit='cover'
          className={styles['img']}
          fluid={data.file.childImageSharp.fluid}
          alt='Woman sitting in a wheelchair, proudly'
          
        />
        <div
          className={styles['divider']}
        >
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M741,116.23C291,117.43,0,27.57,0,6V120H1200V6C1200,27.93,1186.4,119.83,741,116.23Z"
              className={styles['shapeFill']}
            />
          </svg>
        </div>
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
              className={styles['header']}
              style={{
                fontWeight: 'bold'
              }}
            >
              Aiding you, to live a better life.
            </Typography>
            <br />
            <Typography
              variant='h4'
              className={styles['subheader']}
            >
              Your one stop medical supply shop, with exceptional products at unbeatable prices.
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
    </section>
  )
}

export default Hero