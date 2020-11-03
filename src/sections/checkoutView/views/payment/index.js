import React from 'react'

// Material
import {
  Button,
  LinearProgress,
  Typography
} from '@material-ui/core'
import {
  InfoOutlined,
  CreditCardRounded
} from '@material-ui/icons'
import {
  Alert
} from '@material-ui/lab'

// Svg
import BankIcon from '../../../../svg/bank.svg'
import OnlinePaymentIcon from '../../../../svg/payment-method.svg'

// Styles
import styles from './styles.module.scss'

const Payment = props => {
  const {
    handlePrev,
    cart
  } = props

  const [current, send] = cart

  function _bankTransfer() {
    send('BANK_TRAMSFER')
  }

  return (
    <div
      className={styles['payment']}
    >
      <div
        className={styles['paymentSelection']}
      >
        <div
          className={styles['iconContainer']}
        >
          <BankIcon
            className={styles['icon']}
          />
        </div>
        <div
          className={styles['titleContainer']}
        >
          <Typography
            variant='h5'
          >
            <b>Manual Payment</b>
          </Typography>
        </div>
        
        {/* <div
          className={styles['loading']}
        >
          <LinearProgress
            color='secondary'
          />
        </div> */}

        {/* <div
          className={styles['actionContainer']}
        >
          <Button
            variant='outlined'
            disableElevation
            color='secondary'
            disabled
            fullWidth
          >
            Select
          </Button>
        </div> */}
        <div
          className={styles['alertContainer']}
        >
          <Alert
            iconMapping={{success: <InfoOutlined />}}
            variant='outlined'
          >
            Coming Soon.
          </Alert>
        </div>
      </div>

      <div
        className={styles['paymentSelection']}
      >
        <div
          className={styles['iconContainer']}
        >
          <OnlinePaymentIcon
            className={styles['icon']}
          />
        </div>
        <div
          className={styles['titleContainer']}
        >
          <Typography
            variant='h5'
          >
            <b>Online Payment</b>
          </Typography>
        </div>

        <div
          className={styles['alertContainer']}
        >
          <Alert
            iconMapping={{success: <InfoOutlined />}}
            variant='outlined'
          >
            Coming Soon.
          </Alert>
        </div>
      </div>
    </div>
  )
}

export default Payment
