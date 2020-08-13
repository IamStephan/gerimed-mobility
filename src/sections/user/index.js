import React, { useState } from 'react'

// Material
import { Tab } from '@material-ui/core'
import { TabList, TabPanel, TabContext } from '@material-ui/lab'
import { InfoOutlined ,AccountCircleOutlined, LocalShippingOutlined, SettingsOutlined, AccountBalanceWalletOutlined } from '@material-ui/icons'


// Tabs
import Info from './tabs/info'
import Shipping from './tabs/shipping'
import Settings from './tabs/settings'
import Purchases from './tabs/purchases'

// Constants
import { TABS } from '../../constants/user'

// Styles
import styles from './styles.module.scss'


/**
 * TODO: Convert form based tabs into actual components to easy use of them
 *       They are very long components and can be converted
 */
const User = () => {
  const [tab, setTab] = useState(TABS.info)

  function _handleChange(e, value) {
    setTab(value)
  }

  return (
    <section
      className={styles['userSection']}
    >
      <div
        className={styles['userContainer']}
      >
        <TabContext
          value={tab}
        >
          <TabList
            className={styles['tabHeader']}
            orientation='vertical'
            variant='scrollable'
            onChange={_handleChange}
            textColor='secondary'
          >
            <Tab
              icon={<InfoOutlined />}
              label='Account'
              value={TABS.info}
            />
            <Tab
              icon={<LocalShippingOutlined />}
              label='Shipping'
              value={TABS.shipping}
            />
            <Tab
              icon={<SettingsOutlined />}
              label='Settings'
              value={TABS.settings}
            />
            <Tab
              icon={<AccountBalanceWalletOutlined />}
              label='Purchases'
              value={TABS.purchase}
            />
          </TabList>

          <TabPanel
            value={TABS.info}
            className={styles['tabPanel']}
          >
            <Info />
          </TabPanel>
          <TabPanel
            value={TABS.shipping}
            className={styles['tabPanel']}
          >
            <Shipping />
          </TabPanel>
          <TabPanel
            value={TABS.settings}
            className={styles['tabPanel']}
          >
            <Settings />
          </TabPanel>
          <TabPanel
            value={TABS.purchase}
            className={styles['tabPanel']}
          >
            <Purchases />
          </TabPanel>
        </TabContext>
      </div>
    </section>
  )
}

export default User
