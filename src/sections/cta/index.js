import React from 'react'

// Templates
import { Section } from '../../templates/content_layout'

// Gatsby
import { Link } from 'gatsby'

// Material
import { Button, Typography } from '@material-ui/core'

// Styles
import styles from './styles.module.scss'

const CTA = () => {
  return (
    <Section
      className={styles['ctaSection']}
      isClamped={false}
      isPadded={false}
      gutter='none'
    >
      <div
        className={styles['topDivider']}
      >
        <svg
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
            <path
              d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
              class={styles['shapeFill']}/>
        </svg>
      </div>
      
      <div
        className={styles['ctaContainer']}
      >
        <Typography
          variant='h4'
          color='primary'
          className={styles['title']}
        >
          Convinced Yet?
        </Typography>
        <Typography
          className={styles['content']}
          variant='subtitle1'
        >
          With high quality products and excellent service, Gerimed Mobility, truly is your one stop medical supply shop. Just look at our products and catalog.
        </Typography>
        <Button
          disableElevation
          variant='contained'
          color='primary'
          size='large'
          component={Link}
          to='/shop'
        >
          Shop Now
        </Button>
      </div>
    </Section>
  )
}

export default CTA
