import React, { useState } from 'react'

// Components
import NotificationCenter from '../../components/notifications'

// Components
import LoginMode from './components/login'

// Query Params
import { useLocation } from '@reach/router'
import { parse } from 'query-string'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// Constants
import { LOGIN_MODE } from '../../constants/profile'

// Styles
import styles from './styles.module.scss'

const LoginSection = () => {
  const location = useLocation()

  const queries = parse(location.search)

  // Meta info
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            server
            port
          }
        }
      }
    `
  )

  // Errors
  const [notis, setNotis] = useState([])

  function _removeNoti(id) {
    setNotis(notis.filter(v => v.id !== id))
  }

  function LoginMode() {
    switch(queries[LOGIN_MODE.loginMode]) {
      case LOGIN_MODE.normal: {
        return (
          <LoginMode
            site={site}
            setNotis={setNotis}
          />
        )
      }

      case LOGIN_MODE.email: {
        return null
      }

      case LOGIN_MODE.password: {
        return null
      }

      default: {
        return (
          <LoginMode
            site={site}
            setNotis={setNotis}
          />
        )
      }
    }
  }

  return (
    <>
      <NotificationCenter
        notifications={notis}
        removeNoti={_removeNoti}
      />
      <section
        className={styles['loginSection']}
      >
        hjb
      </section>
    </>

  )
}

/**
 * NOTES:
 * ======
 * Keep in mind that this section is not
 * meant for reuse in othe pages
 */

export default LoginSection
