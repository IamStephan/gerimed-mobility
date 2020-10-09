import React, { useState, useEffect } from 'react'

// Hooks
import { useMedia } from 'react-use'

// Material
import { Tab, Typography, Divider } from '@material-ui/core'
import { TabList, TabPanel, TabContext } from '@material-ui/lab'
import { 
  InfoOutlined,
  LocalShippingOutlined,
  SettingsOutlined,
  AccountBalanceWalletOutlined
 } from '@material-ui/icons'

// Gatbsy
import { navigate } from 'gatsby'

// Tabs
import Info from './tabs/info'
import Shipping from './tabs/shipping'
import Settings from './tabs/settings'
import Purchases from './tabs/purchases'

// Templates
import { Section } from '../../templates/content_layout'

// Constants
import { USER_TABS } from '../../constants/profile'

// Styles
import styles from './styles.module.scss'

const User = () => {
  const [tab, setTab] = useState(USER_TABS.info)

  const verticalTabs = useMedia('(max-width: 700px)')

  function _handleChange(e, value) {
    setTab(value)
  }

  return (
    <Section
      className={styles['userSection']}
    >
      <Typography
        gutterBottom
        variant='h3'
        color='secondary'
      >
        <b>Your Profile</b>
      </Typography>

      <Divider />

      <div
        className={styles['userContainer']}
      >
        <TabContext
          value={tab}
        >
          <TabList
            className={`${styles['tabHeader']} ${!false ? styles['pushHeader'] : ''}`}
            orientation={verticalTabs ? 'horizontal' : 'vertical'}
            variant='fullWidth'
            onChange={_handleChange}
            textColor='secondary'
          >
            <Tab
              icon={<InfoOutlined />}
              label={verticalTabs ? '' : 'Account'}
              value={USER_TABS.info}
            />
            <Tab
              icon={<LocalShippingOutlined />}
              label={verticalTabs ? '' : 'Shipping'}
              value={USER_TABS.shipping}
            />
            <Tab
              icon={<AccountBalanceWalletOutlined />}
              label={verticalTabs ? '' : 'Purchases'}
              value={USER_TABS.purchase}
            />
            <Tab
              icon={<SettingsOutlined />}
              label={verticalTabs ? '' : 'Settings'}
              value={USER_TABS.settings}
            />
          </TabList>

          <TabPanel
            value={USER_TABS.info}
            className={styles['tabPanel']}
          >
            <Info />
          </TabPanel>
          <TabPanel
            value={USER_TABS.shipping}
            className={styles['tabPanel']}
          >
            <Shipping />
          </TabPanel>
          <TabPanel
            value={USER_TABS.purchase}
            className={styles['tabPanel']}
          >
            {/* <Purchases /> */}
          </TabPanel>
          <TabPanel
            value={USER_TABS.settings}
            className={styles['tabPanel']}
          >
            <Settings />
          </TabPanel>
        </TabContext>
      </div>
    </Section>
  )
}

export default User
