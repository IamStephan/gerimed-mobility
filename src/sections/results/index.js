import React, { useEffect, useState } from 'react'

// Material
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button
} from '@material-ui/core'
import {
  Alert,
  AlertTitle
} from '@material-ui/lab'

// Gatsby
import { useLocation } from '@reach/router'

// URL
import { parse } from 'qs'

// Gatsby
import { Link } from 'gatsby'

// Templates
import { Section } from '../../templates/content_layout'

// Styles
import styles from './styles.module.scss'

const ResultsSection = () => {
  const location = useLocation()

  const [info, setInfo] = useState(null)

  useEffect(() => {
    if(!location.search) return

    const search = window.location.search.substring(1)
    let res = {}

    try {
      res = parse(search)
    } catch(e) {
      res = {
        reference: 'Unknown',
        type: ''
      }
    }

    setInfo(res)

  }, [location.search])

  console.log(info)

  return (
    <Section
      className={styles['results']}
    >
      <Typography
        variant='h4'
      >
        <b>Order Reference</b>: {info?.reference}
      </Typography>

      <br />

      <Alert>
        <AlertTitle>
          <b>Your order has been successfully placed.</b>
        </AlertTitle>
        Thank you for placing your order. We have sent you an email containing all your order details.<br />
        If you did not receive any email from us <b>within 24 hours</b>, please contact us and include your order reference.<br /><br />

        <b>Contact Email:</b> <Typography component='a' href='mailto:info@gerimedmobility.co.za'><b>info@gerimedmobility.co.za</b></Typography>
      </Alert>

      <br/>

      <Typography
        variant='h4'
      >
        <b>What's next?</b>
      </Typography>

      {
        info?.type === 'manual' ? (
          <List>
            <ListItem>
              <ListItemText
                primary='Getting Started.'
                secondary='We are now in the process of making sure your order can be fulfilled.'
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary='Getting In Touch.'
                secondary='Once your order has been processed we will contact you making sure your order is ready.'
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary='Accepting.'
                secondary='When your order has been paid for we will ship you order immediately.'
              />
            </ListItem>
          </List>
        ) : (
          <List>
            <ListItemText
                primary='Sit back and relax.'
                secondary='Your order has been paid for and is on its way.'
              />
          </List>
        )
      }

      <Button
        variant='contained'
        color='secondary'
        disableElevation
        component={Link}
        to='/shop'
      >
        Continue Shopping
      </Button>

      
    </Section>
  )
}

export default ResultsSection
