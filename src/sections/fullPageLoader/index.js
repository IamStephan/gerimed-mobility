import React from 'react'

// Material
import { CircularProgress } from '@material-ui/core'

// Styles
import styles from './styles.module.scss'

const FullPageLoader = () => {
  return (
    <section
      className={styles['fullPageLoader']}
    >
      <CircularProgress
        color='secondary'
        size='3rem'
      />
    </section>
  )
}

export default FullPageLoader
