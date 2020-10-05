import React from 'react'

// Gatsby
import { useStaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'

// Provider
import StyleProvider from '../../organisms/provider'

// Constants
import { PAGES } from '../../constants/pages'

// Styles
import styles from './styles.module.scss'

const AuthShowcase = props => {
  const {
    page
  } = props

  const images = useStaticQuery(graphql`
    query {
      logo: file(relativePath: {eq: "site/logo.png"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          } 
        }
      }

      register: file(relativePath: {eq: "gallery/showcase/register.jpg"}) {
        childImageSharp {
          fluid(maxWidth: 2000) {
            ...GatsbyImageSharpFluid
          } 
        }
      }

      login: file(relativePath: {eq: "gallery/showcase/login.jpg"}) {
        childImageSharp {
          fluid(maxWidth: 2000) {
            ...GatsbyImageSharpFluid
          } 
        }
      }
    }
  `)

  let imageToLoad = ''

  switch(page) {
    case PAGES.login: {
      imageToLoad = 'login'
      break
    }

    case PAGES.register: {
      imageToLoad = 'register'
      break
    }

    default: {
      imageToLoad = 'login'
    }
  }

  return (
    <StyleProvider>
      <section
        className={styles['showcaseSection']}
      >
        <div
          className={styles['sideDivider']}
        >
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 120 1200"
            preserveAspectRatio="none"
          >
            <path
              d="M2 1200 8 1200c22 0 111-291 110-741 4-445-88-459-110-459L2 0Z"
              className={styles['shapeFill']}
            />
          </svg>
        </div>

        <div
          className={styles['showcaseContainer']}
        >
          <div
            className={styles['imgContainer']}
          >
            <Img
              className={styles['img']}
              objectPosition='center center'
              objectFit='cover'
              fluid={images[imageToLoad].childImageSharp.fluid}
              alt='Gerimed Mobility'
            />
          </div>

          <div
            className={styles['infoContainer']}
          >
              <div
                className={styles['logoContainer']}
              >
                <Link
                  to='/'
                >
                  <Img
                    fluid={images.logo.childImageSharp.fluid}
                    alt='Gerimed Mobility'
                    
                  />
                </Link>
                
              </div>

          </div>
        </div>
      </section>
    </StyleProvider>
  )
}

/**
 * NOTES:
 * ======
 * Keep in mind that this section is not
 * meant for reuse in othe pages
 */

export default AuthShowcase
