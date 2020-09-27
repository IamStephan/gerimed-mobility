import React from 'react'

// Templates
import { Section } from '../../templates/content_layout'

// Material
import { Typography, Button } from '@material-ui/core'

// Gatsby
import { useStaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill' // <= Required for the position to work

// Styles
import styles from './styles.module.scss'

// Static Queries
const STATIC_QUERY = graphql`
  query {
    file(relativePath: {eq: "site/hero-2.png"}) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        } 
      }
    }
  }
`

const Hero = () => {
  const data = useStaticQuery(STATIC_QUERY)

  return (
    <Section
      className={styles['hero']}
      isClamped={false}
      isPadded={false}
      gutter='none'
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
              d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z"
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
              Aiding you, to live a better life
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
                component={Link}
                className={styles['button']}
                to='/shop'
              >
                Our Shop
              </Button>
              <Button
                variant='outlined'
                color='primary'
                size='large'
                component={Link}
                className={styles['button']}
                to='/about'
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Hero