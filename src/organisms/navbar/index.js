import React, { useState, useEffect } from 'react'

// Hooks
import { useToken } from '../../hooks/useToken'
import { useLayout } from '../../hooks/useLayout'
import { useMedia } from 'react-use'
import { useScrollData } from 'scroll-data-hook'

// Gatsby
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'

// Components
import Drawer from '../drawer'

// Material
import { Button, IconButton } from '@material-ui/core'
import { ShoppingCartOutlined, AccountCircleOutlined, Menu } from '@material-ui/icons'

// Constants
import { PAGES } from '../../constants/pages'
import { MODE } from '../../constants/navbar'
import { KEYS } from '../../constants/localStorage'
import { NAV_BAR_ACTIONS } from '../../constants/state'

// Styles
import styles from './styles.module.scss'

// Internal Constants
const PEEK_HIDE_TRIGGER_DISTANCE = 150
const BREAKPOINT_TWO = 750 // <== Cannot import the scss variable in a consistent manner

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
 * NOTE:
 * =====
 * Use this to prevent the entire nav tree from
 * rerendering on every frame
 */

const DummyScrollDetector = props => {
  const {
    navMode
  } = props

  const { navPeek, setNavPeek } = useLayout()

  /**
   * NOTE:
   * =====
   * Handles navbar peeking and modifies it
   */
  const {
    direction,
    speed,
    position
  } = useScrollData()

  /**
   * 
   */
  useEffect(() => {
    if(navMode === MODE.trans) {
      if(!navPeek) {
        setNavPeek(true)
      }

      return
    }

    // Hide peek is only allowed when the nav bar is passed trigger distance
    if(position.y <= PEEK_HIDE_TRIGGER_DISTANCE) {
      if(!navPeek) {
        setNavPeek(true)
      }

      return
    }

    // For scrolling down
    if(direction.y === 'down' && navPeek) {
      if(speed.y > 600) {
        setNavPeek(false)
      }

      return
    }

    // For scrolling down
    if(direction.y === 'up' && !navPeek) {
      if(speed.y > 600) {
        setNavPeek(true)
      }

      return
    }
  })

  // Not a render Component
  return null
}


/**
 * This button is used to override the default styles
 * by the Provider. Delcaring a second MUI theme causes
 * bugs.
 */
const NormalButton = props => {
  const {
    navMode,
    active
  } = props

  const shouldBePrimary = (navMode === MODE.trans || active)
  
  const buttonStyle = shouldBePrimary ? '' : styles['button']

  return (
    <Button
      disableElevation
      component={Link}
      color={shouldBePrimary ? 'primary' : 'inherit'}
      className={`${styles['normalButton']} ${buttonStyle}`}
      {...props}
    >
      {props.children}
    </Button>
  )
}

const Navbar = props => {
  const data = useStaticQuery(STATIC_QUERY)

  const {
    page,
    navMode = MODE.normal
  } = props

  const { info: { token } } = useToken(KEYS.jwt)
  const { navPeek } = useLayout()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const breakpointTwo = useMedia(`(max-width: ${BREAKPOINT_TWO}px)`)

  return (
    <>
      <DummyScrollDetector
        navMode={navMode}
      />
      <nav
        className={`${styles['navbar']} ${styles[navMode]} ${navPeek ? styles['peek'] : null}`}
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

          {
            // Desktop Links
            !breakpointTwo ? (
              <>
                <ol
                  className={styles['links']}
                >
                  <li>
                    <NormalButton
                      active={page === PAGES.shop}
                      navMode={navMode}
                      to='/shop'
                    >
                      Shop
                    </NormalButton>
                  </li>
                  <li>
                    <NormalButton
                      active={page === PAGES.about}
                      navMode={navMode}
                      to='/about'
                    >
                      About Us
                    </NormalButton>
                  </li>
                  <li>
                    <NormalButton
                      active={page === PAGES.contact}
                      navMode={navMode}
                      to='/contact'
                    >
                      Contact
                    </NormalButton>
                  </li>
                </ol>

                <ol
                  className={styles['actions']}
                >
                  <li>
                    <IconButton
                      className={styles['iconButton']}
                      isableElevation
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
                      disableElevation
                      color='primary'
                    >
                      <ShoppingCartOutlined />
                    </IconButton>
                  </li>
                </ol>
              </>
            ) : (
              <ol
                className={styles['actions']}
              >
                <li>
                  <IconButton
                    className={styles['iconButton']}
                    disableElevation
                    color='primary'
                    onClick={() => setIsDrawerOpen(true)}
                  >
                    <Menu />
                  </IconButton>
                </li>
              </ol>
            )
          }
        </div>
      </nav>

      
      {
        breakpointTwo ? (
          <Drawer
            open={isDrawerOpen}
            setOpen={setIsDrawerOpen}
            page={page}
            token={token}
          />
        ) : null
      }
    </>

  )
}

export default Navbar
