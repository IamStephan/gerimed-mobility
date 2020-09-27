import React from 'react'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// Material
import { Typography, Chip } from '@material-ui/core'

// Templates
import { Section } from '../../templates/content_layout'

// Styles
import styles from './styles.module.scss';

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

// Static queries
const STATIC_QUERY = graphql`
  query {
    strapiLegal {
      privacyPolicy {
        updatedAt
        content
      }
    }
  }
`

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
]

const PolicyDetails = () => {
  const {
    strapiLegal: {
      privacyPolicy: {
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
      className={styles['policySection']}
    >
      <section>
        <Title>
          Privacy Notice
        </Title>

        <Chip
          variant='outlined'
          color='secondary'
          label={formatDate(updatedAt)}
        />
      </section>

      <br />

      <section
        dangerouslySetInnerHTML={{__html: content}}
      />
    </Section>
  )
}

export default PolicyDetails
