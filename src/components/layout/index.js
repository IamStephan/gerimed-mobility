import React from 'react'
import t from 'prop-types'

// Components
import Provider from '../provider'
import Navbar from '../navbar'
import Footer from '../footer'

// Styles
import styles from './styles.module.scss'

const Layout = props => {
  const {
    page,
    navMode,
    footerMode
  } = props

  const NavProps = {
    page,
    navMode
  }

  const FooterProps = {
    footerMode
  }

  return (
    <Provider>
      <div
        className={styles['layout']}
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

    </Provider>
  )
}

Layout.propTypes = {
  page: t.string,
  trans: t.bool,
}

export default Layout
