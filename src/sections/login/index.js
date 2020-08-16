import React, { useState } from 'react'

// Components
import NotificationCenter from '../../components/notifications'

// Components
import LoginMode from './components/login'
import EmailMode from './components/email'
import PasswordMode from './components/password'

// Query Params
import { useLocation } from '@reach/router'
import { parse } from 'query-string'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// Constants
import { LOGIN_PATHS } from '../../constants/profile'

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
            protocol
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

  function LoginModeComponents() {
    switch(location.pathname) {
      case LOGIN_PATHS.normal: {
        return (
          <LoginMode
            site={site}
            setNotis={setNotis}
          />
        )
      }

      case LOGIN_PATHS.email: {
        return (
          <EmailMode
            site={site}
            setNotis={setNotis}
          />
        )
      }

      case LOGIN_PATHS.password: {
        return (
          <PasswordMode
            site={site}
            setNotis={setNotis}
          />
        )
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
        <LoginModeComponents />
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
