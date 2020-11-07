import React, { useEffect, useState } from 'react'

// Material
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  StepButton,
  Button,
  Backdrop,
  CircularProgress
} from '@material-ui/core'
import {
  Alert,
  AlertTitle
} from '@material-ui/lab'
import {
  InfoOutlined
} from '@material-ui/icons'

// Gatsby
import { Link } from 'gatsby'

// Hooks
import { useService } from '@xstate/react'

// Global Controller
import { CartService, AuthService } from '../../organisms/provider'

// Template
import { Section } from '../../templates/content_layout'

// Local Molecules
import StepperIcon from './molecules/stepper_icon'

// Views
import Details from './views/details_form'
import Summary from './views/summary'
import Payment from './views/payment'

// Styles
import styles from './styles.module.scss'

const CheckoutView = () => {
  const [currentCart, sendCart] = useService(CartService)
  const [currentAuth] = useService(AuthService)

  const loading = currentAuth.matches('loading') || currentCart.matches('loading') || currentCart.matches('ready')
  const loadingTransfer = currentCart.matches({ loading: 'bankTransfer' })

  const cart = currentCart.context?.cartData

  const [activeStep, setActiveStep] = useState(0)
  const [shouldLoad, setShouldLoad] = useState(false)

  /**
   * Backdrop:
   * ==========
   * 
   * This effect removes the backdrop
   * when the loading has stopped and there is
   * still a cart open (indicates a faliure)
   */
  useEffect(() => {
    let prevLoadState
    if(loadingTransfer) {
      setShouldLoad(true)
    } else {
      
      if(prevLoadState?.isLoading && cart?.reference) {
        setShouldLoad(false)
      }
    }

    prevLoadState = {
      isLoading: loadingTransfer
    }

    return () => {
      prevLoadState = {
        isLoading: loadingTransfer
      }
    }
  }, [loadingTransfer, cart])

  /**
   * Local Utils
   */
  function _handleNext() {
    setActiveStep(prev => prev + 1)
  }

  function _handlePrev() {
    if(activeStep >= 0) {
      setActiveStep(prev => prev - 1)
    }
  }

  function _checkCompleted(i) {
    switch(true) {
      case i === 0: {
        // Details Form
        if(cart?.address && cart?.contact) {
          return true
        }
        return false
      }
      case i === 1: {
        // Cart Summary
        if(activeStep > 1) {
          return true
        }
        return false
      }
      case i === 2: {
        // Payment
        return false
      }
      default: {
        return false
      }
    }
  }

  const steps = [
    {
      title: 'Shipping Information',
      content: (
        <Details
          handleNext={_handleNext}
          cart={[currentCart, sendCart]}
          auth={[currentAuth]}
        />
      )
    },
    {
      title: 'Cart Summary',
      content: (
        <Summary
          handleNext={_handleNext}
          handlePrev={_handlePrev}
          cart={[currentCart]}
        />
      )
    },
    {
      title: 'Order Processing',
      content: (
        <Payment
          handlePrev={_handlePrev}
          cart={[currentCart, sendCart]}
        />
      )
    }
  ]

  /**
   * Make Sure There is an Actual cart to use
   */
  const isEmpty = !loading && (!cart || !cart?.cart?.products?.length > 0)

  return (
    <Section
      className={styles['checkoutSection']}
    >
      <Typography
        gutterBottom
        variant='h3'
        color='secondary'
      >
        <b>Checkout</b>
      </Typography>

      {
        isEmpty ? (
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
        ) : (
          <Stepper
            className={styles['stepper']}
            activeStep={activeStep}
            orientation='vertical'
            color='secondary'
            nonLinear
          >
            {
              steps.map((step, i) => (
                <Step
                  key={i}
                >
                  <StepButton
                    onClick={() => setActiveStep(i)}
                    completed={_checkCompleted(i)}
                  >
                    <StepLabel
                      StepIconComponent={StepperIcon}
                    >
                      <b>{step.title}</b>
                    </StepLabel>
                  </StepButton>
    
                  <StepContent>
                    {step.content}
                  </StepContent>
                </Step>
              ))
            }
          </Stepper>
        )
      }

      <Backdrop
        open={shouldLoad}
        style={{
          zIndex: 99999
        }}
      >
        <CircularProgress
          color='primary'
        />
      </Backdrop>
    </Section>
  )
}

export default CheckoutView
