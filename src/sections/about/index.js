import React from 'react'

// Material
import { Typography } from '@material-ui/core'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// SVGs
import Logo from '../../svg/logo_green.svg'

// Templates
import { Section } from '../../templates/content_layout'

// Styles
import styles from './styles.module.scss'

// Static queries
const STATIC_QUERY = graphql`
  query {
    strapiBusinessdescription {
      ourBusiness {
        description
      }
    }
  }
`

const AboutSec = () => {
  const {strapiBusinessdescription: {ourBusiness: {description}}} = useStaticQuery(STATIC_QUERY)

  return (
    <Section
      className={styles['aboutSection']}
    >
      <Logo
        className={styles['logo']}
      />

      <Typography
        variant='h2'
        className={styles['title']}
        
      >
        This is our business
      </Typography>

      <div
        className={styles['content']}
      >
        <Typography
          className={styles['description']}
          style={{
            whiteSpace: 'pre-wrap'
          }}
        >
          {description}
        </Typography>
      </div>
    </Section>
  )
}

export default AboutSec
