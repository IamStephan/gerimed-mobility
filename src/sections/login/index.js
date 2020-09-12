import React, { useCallback } from 'react'

// Components
import LoginMode from './components/login'
import EmailMode from './components/email'
import PasswordMode from './components/password'

// Query Params
import { useLocation } from '@reach/router'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// Constants
import { LOGIN_PATHS } from '../../constants/profile'

// Styles
import styles from './styles.module.scss'

const LoginSection = () => {
  const location = useLocation()

  // Meta info
  // NOT NEEDED!!
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

  /**
   * NOTE:
   * =====
   * When this is just a normal function and an update occurs
   * the entire tree gets rerendered and the child components loose
   * their state.
   * 
   * This makes sure the the tree is only rerendered when the path changes.
   */
  const LoginModeComponents = useCallback(() => {
    switch(location.pathname) {
      case LOGIN_PATHS.normal: {
        return (
          <LoginMode
            site={site}
          />
        )
      }

      case LOGIN_PATHS.email: {
        return (
          <EmailMode
            site={site}
          />
        )
      }

      case LOGIN_PATHS.password: {
        return (
          <PasswordMode
            site={site}
          />
        )
      }

      default: {
        return (
          <LoginMode
            site={site}
          />
        )
      }
    }
  }, [location.pathname])

  return (
    <>
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
