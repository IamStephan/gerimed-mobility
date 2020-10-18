import React from 'react'

// Material
import { Button } from '@material-ui/core'
import { InfoOutlined } from '@material-ui/icons'
import { Alert, AlertTitle } from '@material-ui/lab'

// Gatbsy
import { Link } from 'gatsby'

// Styles
import styles from '../../styles.module.scss'

const EmptyView = () => {
  return (
    <div
      className={styles['emptyCartView']}
    >
      <Alert
        iconMapping={{
          success: <InfoOutlined fontSize="inherit" />
        }}
        action={
          <Button
            component={Link}
            to='/shop'
          >
            Shop
          </Button>
        }
      >
        <AlertTitle>
          <b>Empty Shopping Cart</b>
        </AlertTitle>
        Your shopping cart seems to be empty. You can browse our shop and add them to your cart.
      </Alert>
    </div>
  )
}

export default EmptyView
