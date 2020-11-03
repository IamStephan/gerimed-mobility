import React, { useEffect, useState } from 'react'

// Material
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@material-ui/core'

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
  const [currentAuth, sendAuth] = useService(AuthService)

  const [activeStep, setActiveStep] = useState(0)

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

  /**
   * Get the user if they are authenticated but not logged in
   */
  useEffect(() => {
    if(currentAuth.matches({ idle: 'user' }) && !currentAuth.context.user) {
      sendAuth('GET_ME')
    }
  }, [])

  const steps = [
    {
      title: 'Details',
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
      title: 'Payment',
      content: (
        <Payment
          handlePrev={_handlePrev}
          cart={[currentCart, sendCart]}
        />
      )
    }
  ]

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

      <Stepper
        className={styles['stepper']}
        activeStep={activeStep}
        orientation='vertical'
        color='secondary'
      >
        {
          steps.map((step, i) => (
            <Step
              key={i}
            >
              <StepLabel
                StepIconComponent={StepperIcon}
              >
                <b>{step.title}</b>
              </StepLabel>

              <StepContent>
                {step.content}
              </StepContent>
            </Step>
          ))
        }
      </Stepper>
    </Section>
  )
}

export default CheckoutView
