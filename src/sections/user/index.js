import React, { useState } from 'react'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// Hooks
import { useMedia } from 'react-use'

// Material
import { Tab } from '@material-ui/core'
import { TabList, TabPanel, TabContext } from '@material-ui/lab'
import { 
  InfoOutlined,
  LocalShippingOutlined,
  SettingsOutlined,
  AccountBalanceWalletOutlined
 } from '@material-ui/icons'


// Tabs
import Info from './tabs/info'
import Shipping from './tabs/shipping'
import Settings from './tabs/settings'
import Purchases from './tabs/purchases'

// Constants
import { USER_TABS } from '../../constants/profile'

// Styles
import styles from './styles.module.scss'


/**
 * TODO: Convert form based tabs into actual components to easy use of them
 *       They are very long components and can be converted
 */
const User = () => {
  // Meta info
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            protocol
            server
            port
          }
        }
      }
    `
  )
  
  const [tab, setTab] = useState(USER_TABS.info)
  const [notis, setNotis] = useState([])

  // Using a fixed value since initial loads dont work with dynamic values
  const verticalTabs = useMedia('(max-width: 700px)')

  function _removeNoti(id) {
    setNotis(notis.filter(v => v.id !== id))
  }

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
              icon={<SettingsOutlined />}
              label={verticalTabs ? '' : 'Settings'}
              value={USER_TABS.settings}
            />
            <Tab
              icon={<AccountBalanceWalletOutlined />}
              label={verticalTabs ? '' : 'Purchases'}
              value={USER_TABS.purchase}
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
            value={USER_TABS.settings}
            className={styles['tabPanel']}
          >
            <Settings
              site={site}
              setNotis={setNotis}
            />
          </TabPanel>
          <TabPanel
            value={USER_TABS.purchase}
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
