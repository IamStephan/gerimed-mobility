import React, { useState } from 'react'

// Hooks
import { useToken } from '../../hooks/useToken'
import { useMedia } from 'react-use'
import { useMachine } from '@xstate/react'

// Controller
import { LocalState } from './controller'

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

// Styles
import styles from './styles.module.scss'

// Internal Constants
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

const Navbar = props => {
  const {
    page,
    enableTransMode = false
  } = props

  const data = useStaticQuery(STATIC_QUERY)
  const [current] = useMachine(LocalState, {
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

  const { info: { token } } = useToken(KEYS.jwt)

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const breakpointTwo = useMedia(`(max-width: ${BREAKPOINT_TWO}px)`)

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
