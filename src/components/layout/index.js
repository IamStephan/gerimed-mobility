import React from 'react'

// Components
import Navbar from '../navbar'
import Footer from '../footer'

// Styles
import styles from './styles.module.scss'

const Layout = props => {
  const {
    page,
    navMode,
    footerMode,
    accountNav
  } = props

  const NavProps = {
    page,
    navMode
  }

  const FooterProps = {
    footerMode
  }

  return (
    <>
      <div
        className={`${styles['layout']} ${accountNav ? styles['accountNav'] : ''}`}
      >
        <Navbar
          {...NavProps}
        />
        
        <main
          className={styles['main']}
        >
          { props.children }
        </main>

        <Footer
          {...FooterProps}
        />
      </div>

    </>
  )
}

Layout.defaultProps = {
  accountNav: true
}

export default Layout
