import React from 'react'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// Templates
import { Section } from '../../templates/content_layout'

// Material
import { Typography, Chip } from '@material-ui/core'

// Styles
import styles from './styles.module.scss';

// Static queries
const STATIC_QUERY = graphql`
  query {
    strapiLegal {
      termsAndCondition {
        content
        updatedAt
      }
    }
  }
`

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
]

const Title = props => {
  return (
    <Typography
      variant='h2'
      className={styles['title']}
      gutterBottom
    >
      {props.children}
    </Typography>
  )
}

const TermsDetails = () => {
  const {
    strapiLegal: {
      termsAndCondition: {
        content,
        updatedAt
      }
    }
  } = useStaticQuery(STATIC_QUERY)

  function formatDate(dateS) {
    const date = new Date(dateS)
    
    const day = date.getDate()
    const month = MONTHS[date.getMonth()]
    const year = date.getFullYear()


    return `Last updated: ${day} ${month} ${year}`
  }

  return (
    <Section
      className={styles['termsSection']}
    >
      <section>
        <Title>
          Terms of use
        </Title>

        <Chip
          variant='outlined'
          color='secondary'
          label={formatDate(updatedAt)}
        />
      </section>

      <br />

      <section
        className={styles['contentSection']}
        dangerouslySetInnerHTML={{__html: content}}
      />
    </Section>
  )
}

export default TermsDetails
