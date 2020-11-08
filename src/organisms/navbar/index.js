import React, { useState, useEffect } from 'react'

// Hooks
import { useService } from '@xstate/react'

// Global Controller
import { CartService } from '../provider'

// Gatsby
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'

// Components
import Drawer from '../drawer'

// Utils
import { throttle } from 'lodash'

// Material
import { Button, IconButton, Badge } from '@material-ui/core'
import { ShoppingCartOutlined, AccountCircleOutlined, Menu } from '@material-ui/icons'

// Constants
import { PAGES } from '../../constants/pages'

// Styles
import styles from './styles.module.scss'

// Static queries
const STATIC_QUERY = graphql`
  query {
    file(relativePath: {eq: "site/logo.png"}) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        } 
      }
    }
  }
`

/**
 * This button is used to override the default styles
 * by the Provider. Delcaring a second MUI theme causes
 * bugs.
 */
const NormalButton = props => {
  const {
    isTrans = false,
    active,
    to
  } = props

  const shouldBePrimary = (isTrans || active)
  
  const buttonStyle = shouldBePrimary ? '' : styles['button']

  return (
    <Button
      disableElevation
      component={Link}
      color={shouldBePrimary ? 'primary' : 'inherit'}
      className={`${styles['normalButton']} ${buttonStyle}`}
      to={to}
    >
      {props.children}
    </Button>
  )
}

const NavStates = {
  trans: 'TRANS',
  show: 'SHOW',
  hide: 'HIDE'
}
const SHOW_HIDE_TRIGGER_DISTANCE = 150
const THROTTLE_WAIT = 75

const Navbar = props => {
  const {
    page,
    enableTransMode = false
  } = props

  const [currentGlobal] = useService(CartService)

  const products = currentGlobal.context.cartData?.cart?.products || []

  const data = useStaticQuery(STATIC_QUERY)

  function getNavInitialState() {
    // Gatsby Building
    if(typeof window === 'undefined') {
      if(enableTransMode) {
        return NavStates.trans
      }
      return NavStates.show
    }

    if(enableTransMode && window.pageYOffset === 0) {
      return NavStates.trans
    }

    return NavStates.show
  }

  /**
   * NAVBAR
   * ===========================
   */

  const [navState, setNavState] = useState(getNavInitialState)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    let prevScrollPos = window.pageYOffset
    let currentScrollPos = window.pageYOffset
    let oldNavState = navState

    if(typeof window === 'undefined') {
      setNavState(NavStates.trans)
      return
    }

    const onScroll = throttle(() => {
      currentScrollPos = window.pageYOffset

      if(enableTransMode && currentScrollPos < SHOW_HIDE_TRIGGER_DISTANCE) {
        if(oldNavState !== NavStates.trans) {
          setNavState(NavStates.trans)
        }
      } else if(prevScrollPos > currentScrollPos || currentScrollPos < SHOW_HIDE_TRIGGER_DISTANCE) {
        if(oldNavState !== NavStates.show) {
          setNavState(NavStates.show)
        }
        
      } else {
        if(oldNavState !== NavStates.hide) {
          setNavState(NavStates.hide)
        }
      }

      prevScrollPos = currentScrollPos
    }, THROTTLE_WAIT, {
      trailing: true
    })

    window.addEventListener('scroll', onScroll)

    // Clear scroll listener
    return () => window.removeEventListener('scroll', onScroll)
  }, [navState]) // eslint-disable-line react-hooks/exhaustive-deps

  let addedStyles = ''

  switch(navState) {
    case NavStates.show: {
      addedStyles += ' ' + styles['normal']
      addedStyles += ' ' + styles['show']
      break
    }

    case NavStates.hide: {
      addedStyles += ' ' + styles['normal']
      addedStyles += ' ' + styles['hide']
      break
    }

    case NavStates.trans: {
      addedStyles += ' ' + styles['trans']
      break
    }

    default: {
      addedStyles += ' ' + styles['normal']
      addedStyles += ' ' + styles['show']
    }
  }

  const isTrans = navState === NavStates.trans

  function _toggleDrawer() {
    setIsDrawerOpen(prev => !prev)
  }

  return (
    <>
      <nav
        className={`${styles['navbar']} ${addedStyles}`}
      >
        <div
          className={styles['container']}
        >
          <div
            className={styles['logo']}
          >
            <Link
              to='/'
            >
              <Img
                className={styles['img']}
                objectFit='contain'
                objectPosition='left center'
                fluid={data.file.childImageSharp.fluid}
                alt='Gerimed Mobility, Aiding you, to live a better live'
              />
            </Link>
          </div>

          {/**
           * DESKTOP
           */}
          <ol
            className={`${styles['links']} ${styles['desktop']}`}
          >
            <li>
              <NormalButton
                active={page === PAGES.shop}
                isTrans={isTrans}
                to='/shop'
              >
                Shop
              </NormalButton>
            </li>
            <li>
              <NormalButton
                active={page === PAGES.about}
                isTrans={isTrans}
                to='/about'
              >
                About Us
              </NormalButton>
            </li>
            <li>
              <NormalButton
                active={page === PAGES.contact}
                isTrans={isTrans}
                to='/contact'
              >
                Contact
              </NormalButton>
            </li>
            <li>
              <NormalButton
                active={page === PAGES.tracker}
                isTrans={isTrans}
                to='/trackorder'
              >
                Track my order
              </NormalButton>
            </li>
          </ol>

          <ol
            className={`${styles['actions']} ${styles['desktop']}`}
          >
            <li>
              <IconButton
                className={styles['iconButton']}
                color='primary'
                component={Link}
                to='/profile'
              >
                <AccountCircleOutlined />
              </IconButton>
            </li>
            <li>
              <IconButton
                className={styles['iconButton']}
                color='primary'
                component={Link}
                to='/cart'
              >
                <Badge badgeContent={products ? products.length : null} color="secondary">
                  <ShoppingCartOutlined />
                </Badge>
                
              </IconButton>
            </li>
          </ol>

          {/**
           * MOBILE
           */}
          <ol
            className={`${styles['actions']} ${styles['mobile']}`}
          >
            <li>
              <IconButton
                className={styles['iconButton']}
                color='primary'
                onClick={_toggleDrawer}
              >
                <Menu />
              </IconButton>
            </li>
          </ol>
        </div>
      </nav>

      <div
        className={styles['drawer']}
      >
        <Drawer
          open={isDrawerOpen}
          toggleDrawer={_toggleDrawer}
          page={page}
        />
      </div>
    </>

  )
}

export default Navbar
