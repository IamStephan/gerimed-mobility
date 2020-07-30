import React from 'react'

import { Alert, AlertTitle } from '@material-ui/lab'

// Styles
import styles from './styles.module.scss'

const AlertSec = () => {
  return (
    <section
      className={styles['alertSection']}
    >
      <div
        className={styles['alertContainer']}
      >
        <Alert
          security='success'
          variant='outlined'
        >
          <AlertTitle>
            <strong>We are open!</strong>
          </AlertTitle>
          Gerimed mobility is <strong>registered</strong> as an essential business.
        </Alert>
      </div>
    </section>
  )
}

export default AlertSec
