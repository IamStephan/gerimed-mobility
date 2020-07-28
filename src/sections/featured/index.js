import React from 'react'

// Material
import { Typography } from '@material-ui/core'

// Styles
import styles from './styles.module.scss'

const Featured = () => {
  return (
    <div
      className={styles['featuredContainer']}
    >
      <Typography
        variant='h3'
      >
        Featured Products
      </Typography>
    </div>
  )
}

export default Featured
