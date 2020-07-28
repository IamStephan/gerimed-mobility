import React from 'react'

// Material
import { Button, Typography } from '@material-ui/core'

// Styles
import styles from './styles.module.scss'

const CTA = () => {
  return (
    <section
      className={styles['ctaSection']}
    >
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
          With high quality products and excellent service, Gerimed Mobility, is truly your one stop medical shop. Just look at our products and catalog.
        </Typography>
        <Button
          disableElevation
          variant='contained'
          color='primary'
          size='large'
        >
          Shop Now
        </Button>
      </div>
    </section>
  )
}

export default CTA
