import React from 'react'

// Templates
import { Section } from '../../templates/content_layout'

// Gatsby
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'

// Styles
import styles from './styles.module.scss'

// Static Queries
const STATIC_QUERY = graphql`
  query {
    file(relativePath: {eq: "gallery/404/background.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        } 
      }
    }
  }
`

const NotFoundSection = () => {
  const data = useStaticQuery(STATIC_QUERY)

  return (
    <Section
      isClamped={false}
      isPadded={false}
      className={styles['notFoundContainer']}
      gutter='none'
    >
      <div
        className={styles['content']}
      >
        <Img
          fluid={data.file.childImageSharp.fluid}
          objectFit='cover'
          className={styles['img']}
          style={{
            position: 'absolute'
          }}
        />
      </div>

      <div className={styles['fade']} />
    </Section>
  )
}

export default NotFoundSection
