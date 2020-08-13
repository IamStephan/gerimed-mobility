import React from 'react'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

// Material
import { Typography } from '@material-ui/core'

// Styles
import styles from './styles.module.scss'

const UserShowcase = () => {
  const image = useStaticQuery(graphql`
    query {
      showcase: file(relativePath: {eq: "gallery/user_showcase/showcase1.jpg"}) {
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
      className={styles['userShowcaseSection']}
    >
      <div
        className={styles['imgContainer']}
      >
        <Img
          className={styles['img']}
          fluid={image.showcase.childImageSharp.fluid}
        />
      </div>

      <div
        className={styles['contentContainer']}
      >
        <Typography
          color='primary'
          variant='h1'
          className={styles['title']}
        >
          Your profile
        </Typography>
      </div>

      <div
          className={styles['bottomDivider']}
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
    </section>
  )
}

export default UserShowcase
