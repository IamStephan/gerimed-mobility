import React from 'react'

// Hooks
import { useMachine, useService } from '@xstate/react'

// Global Controller
import { CartService } from '../provider'

// Controller
import { LocalState } from './controller'

// Gatsby
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'

// Components
import Drawer from '../drawer'

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
    active
  } = props

  const shouldBePrimary = (isTrans || active)
  
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

/**
 * TODO:
 * ===========
 * - use react hooks for the controller (performance gains)
 */

const Navbar = props => {
  const {
    page,
    enableTransMode = false
  } = props

  const [currentGlobal] = useService(CartService)

  const products = currentGlobal.context.cartData?.cart?.products || []

  const data = useStaticQuery(STATIC_QUERY)
  const [current, send] = useMachine(LocalState, {
    context: {
      isTransEnabled: enableTransMode
    }
  })

  let addedStyles = ''

  switch(true) {
    case current.matches('normal'): {
      addedStyles += ' ' + styles['normal']

      switch(true) {
        case current.matches({normal: 'show'}): {
          addedStyles += ' ' + styles['show']
          break
        }

        case current.matches({normal: 'hide'}): {
          addedStyles += ' ' + styles['hide']
          break
        }

        default: {
          addedStyles += ' ' + styles['show']
        }
      }
      break
    }

    case current.matches('trans'): {
      addedStyles += ' ' + styles['trans']
      break
    }

    default: {
      addedStyles += ' ' + styles['normal']
      addedStyles += ' ' + styles['show']
    }
  }

  const isTrans = current.matches('trans')

  function _toggleDrawer() {
    send('TOGGLE_DRAWER')
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
                disableElevation
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
                disableElevation
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
          open={current.context.isDrawerOpen}
          toggleDrawer={_toggleDrawer}
          page={page}
        />
      </div>
    </>

  )
}

export default Navbar
