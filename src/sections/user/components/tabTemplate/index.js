import React from 'react'

// Material
import { Typography } from '@material-ui/core'

// Styles
import styles from './styles.module.scss'

const TabTemplate = props => {
  const {
    title
  } = props

  return (
    <div
      className={styles['tab']}
    >
      <Typography
        variant='h4'
        className={styles['title']}
        id='tabTemplateTitle'
      >
        {title}
      </Typography>

      <div
        className={styles['content']}
      >
        {props.children}
      </div>
    </div>
  )
}

export default TabTemplate