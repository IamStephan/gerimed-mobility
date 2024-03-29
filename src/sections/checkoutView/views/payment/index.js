import React, { useState } from 'react'

// Material
import {
  Tab,
  Button,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar
} from '@material-ui/core'
import {
  DescriptionOutlined,
  SettingsOutlined,
  LocalShippingOutlined,
  ContactSupportOutlined,
  AssignmentTurnedInOutlined,

  AccountBalanceRounded,
  CreditCardRounded
} from '@material-ui/icons'
import {
  TabContext,
  TabList,
  TabPanel,
  Alert,
  AlertTitle
} from '@material-ui/lab'

// Styles
import styles from './styles.module.scss'

const TABS = {
  manual: 'MANUAL',
  online: 'ONLINE'
}

const Payment = props => {
  const {
    handlePrev,
    cart
  } = props

  const [activeTab, setActiveTab] = useState(TABS.manual)
  const [current, send] = cart
  const loading = current.matches('loading')
  const hasDetails = !!current.context?.cartData?.contact && !!current.context?.cartData?.address

  function _bankTransfer() {
    send('BANK_TRANSFER')
  }
  
  function _handleTabChange(e, tab) {
    setActiveTab(tab)
  }

  return (
    <div
      className={styles['payment']}
    >
      <div
        className={styles['tabContainer']}
      >
        <TabContext
          value={activeTab}
        >
          <TabList
            onChange={_handleTabChange}
          >
            <Tab
              icon={<AccountBalanceRounded color='secondary' />}
              value={TABS.manual}
              label={<b>Manual</b>}
            />
            <Tab
              icon={<CreditCardRounded color='secondary' />}
              value={TABS.online}
              label={<b>Online</b>}
            />
          </TabList>
          <Divider/>

          <TabPanel
            value={TABS.manual}
            className={styles['panel']}
          >
            <div
              className={styles['title']}
            >
              <Typography
                variant='h5'
              >
                <b>How It works</b>
              </Typography>
            </div>

            <List>
              <ListItem>
                <ListItemAvatar>
                  <DescriptionOutlined color='secondary' />
                </ListItemAvatar>

                <ListItemText
                  primary={<b>Get A Quote</b>}
                  secondary='Once you have placed your order, we send you an email with the reference number and a quote.'
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <SettingsOutlined color='secondary' />
                </ListItemIcon>

                <ListItemText
                  primary={<b>Your Order Gets Processed</b>}
                  secondary='We receive the order and process it internally, making sure everything is available.'
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <ContactSupportOutlined color='secondary' />
                </ListItemIcon>

                <ListItemText
                  primary={<b>We Make You An Offer</b>}
                  secondary='We contact you to make an offer or send you an invoice.'
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <AssignmentTurnedInOutlined color='secondary' />
                </ListItemIcon>

                <ListItemText
                  primary={<b>The Offer Gets Accepted</b>}
                  secondary='As soon as the order is paid we start with packaging.'
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <LocalShippingOutlined color='secondary' />
                </ListItemIcon>

                <ListItemText
                  primary={<b>Products are Shipped</b>}
                  secondary='Your products are now on their way to you and you can sit back and relax.' 
                />
              </ListItem>
            </List>

            <div
              className={styles['placeOrder']}
            >
              <Button
                variant='contained'
                color='secondary'
                disableElevation
                disabled={true}
                className={styles['placeOrderBtn']}
                // onClick={_bankTransfer}
              >
                Place Order (Currently unavailable)
              </Button>
              {/**
               * Loading indicator is on the main Component
               */}
            </div>            
          </TabPanel>

          <TabPanel
            value={TABS.online}
          >
            <Alert
              severity='warning'
              variant='outlined'
            >
              <AlertTitle>
                <b>Unavailable</b>
              </AlertTitle>
              Online payments are currently unavailable, please use the manual payment option.
            </Alert>
          </TabPanel>
          <Divider />
        </TabContext>
      </div>

      <div
        className={styles['actions']}
      >
        <Button
          variant='outlined'
          color='secondary'
          onClick={handlePrev}
        >
          Back
        </Button>
      </div>
    </div>
  )
}

export default Payment
