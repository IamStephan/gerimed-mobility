import React, { useCallback } from 'react'

// Hooks
import { useMachine } from '@xstate/react'
import { useMedia } from 'react-use'

// Controller
import { LocalState } from './controller'

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

const User = () => {
  const [current, send] = useMachine(LocalState)

  const idle = current.matches('idle')
  const loading = current.matches('loading') || current.matches('retry')
  const fail = current.matches('fail')

  const tab = current.context.currentTab

  // Using a fixed value since initial loads dont work with dynamic values
  const verticalTabs = useMedia('(max-width: 700px)')

  const ShowStates = useCallback(() => {
    switch(true) {
      case loading: {
        return null
      }

      case idle: {
        // const generalInfo = {
        //   first_name: current.context.data.fir
        //   last_name
        //   email
        //   phone
        // }

        const shipping = {
          
        }

        const address = {

        }

        /**
         * NOTE:
         * =====
         * Purchase history has its own controller
         */

        return (
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
              {/* <Info /> */}
            </TabPanel>
            <TabPanel
              value={USER_TABS.shipping}
              className={styles['tabPanel']}
            >
              {/* <Shipping /> */}
            </TabPanel>
            <TabPanel
              value={USER_TABS.settings}
              className={styles['tabPanel']}
            >
              {/* <Settings /> */}
            </TabPanel>
            <TabPanel
              value={USER_TABS.purchase}
              className={styles['tabPanel']}
            >
              {/* <Purchases /> */}
            </TabPanel>
          </TabContext>
        )
      }

      case fail: {
        return null
      }

      default: {
        return null
      }
    }
  }, [current.value, tab, verticalTabs])

  function _handleChange(e, value) {
    send('SET_TAB', {
      tab: value
    })
  }

  return (
    <section
      className={styles['userSection']}
    >
      <div
        className={styles['userContainer']}
      >
        {
          ShowStates()
        }
      </div>
    </section>
  )
}

export default User
