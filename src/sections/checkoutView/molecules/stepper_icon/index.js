import React from 'react'

// Material
import { Typography } from '@material-ui/core'
import { CheckOutlined, PriorityHighRounded } from '@material-ui/icons'

// Styles
import styles from './styles.module.scss'

const StepperIcon = props => {
  const {
    completed,
    active,
    error,
    icon
  } = props

  return (
    <div
      className={`${styles['container']} ${styles[error ? 'error' : (active || completed) ? 'success' : 'nonactive']}`}
    >
      {
        error ? (
          <PriorityHighRounded
            className={styles['icon']}
          />
        ) : completed ? (
          <CheckOutlined
            className={styles['icon']}
          />
        ) : (
          <Typography
            className={`${styles['text']} ${styles[active ? 'active' : 'inactive']}`}
          >
            <b>{icon}</b>
          </Typography>
        )
      }
    </div>
  )
}

export default StepperIcon
