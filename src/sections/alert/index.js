import React from 'react'

// Templates
import { Section } from '../../templates/content_layout'

// Material
import { Alert, AlertTitle } from '@material-ui/lab'

const AlertSec = () => {
  return (
    <Section>
      <Alert
        security='success'
        variant='outlined'
      >
        <AlertTitle>
          <strong>We are open!</strong>
        </AlertTitle>
        Gerimed mobility is <strong>registered</strong> as an essential business.
      </Alert>
    </Section>
  )
}

export default AlertSec
