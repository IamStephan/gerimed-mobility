import React from 'react'

// Material
import { Button } from '@material-ui/core'
import { InfoOutlined } from '@material-ui/icons'
import { Alert, AlertTitle } from '@material-ui/lab'

// Gatbsy
import { Link } from 'gatsby'

// Styles
import styles from '../../styles.module.scss'

const CommingSoonView = () => {
  return (
    <div
      className={styles['emptyCartView']}
    >
      <Alert
        iconMapping={{
          success: <InfoOutlined fontSize="inherit" />
        }}
      >
        <AlertTitle>
          <b>Coming soon</b>
        </AlertTitle>
        Shopping cart functionality is comming soon
      </Alert>
    </div>
  )
}

export default CommingSoonView
