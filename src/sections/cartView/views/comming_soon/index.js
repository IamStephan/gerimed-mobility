import React from 'react'

// Material
import { Alert, AlertTitle } from '@material-ui/lab'

// Styles
import styles from '../../styles.module.scss'

const CommingSoonView = () => {
  return (
    <div
      className={styles['emptyCartView']}
    >
      <Alert
        severity='warning'
      >
        <AlertTitle>
          <b>Coming soon</b>
        </AlertTitle>
        Cart functionality is temporarily disabled.
      </Alert>
    </div>
  )
}

export default CommingSoonView
