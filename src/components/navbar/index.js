import React, { useState } from 'react'
import t from 'prop-types'

// Hooks
import { useMedia } from 'react-use'

// Gatsby
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'

// SVGs
import Logo from '../../svg/logo_green.svg'

// Material
import { Button, IconButton, ButtonGroup } from '@material-ui/core'
import { ShoppingCartOutlined, AccountCircleOutlined, Menu } from '@material-ui/icons'

// Styles
import styles from './styles.module.scss'

// Constants
import { PAGES } from '../../constants/pages'
import { MODE } from '../../constants/navbar'


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

/**
 * TODO:
 *  - convert css animation to js (flip toolkit?)
 *  - Create a seperate component for the mobile drawer
 *  - move the icons to the drawer on mobile deviecs
 */

const Navbar = props => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: {eq: "site/logo.png"}) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          } 
        }
      }
    }
  `)

  const {
    page,
    navMode
  } = props

  const [ isModalVisible, setIsMobileVisible ] = useState(false)

  const breakpointTwo = useMedia(`(max-width: ${Number(styles.breakpointTwo)}px)`)

  return (
    <>
      <nav
        className={`${styles['navbar']} ${styles[navMode]}`}
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
            !breakpointTwo ? (
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
                <li>
                  <NormalButton
                    active={page === PAGES.policy}
                    navMode={navMode}
                    to='/policy'
                  >
                    Policies
                  </NormalButton>
                </li>
              </ol>

            ) : null
          }
          
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

            {
              breakpointTwo ? (
                <li>
                  <IconButton
                    className={styles['iconButton']}
                    disableElevation
                    color='primary'
                    onClick={() => setIsMobileVisible(true)}
                  >
                    <Menu />
                  </IconButton>
              </li>
              ) : null
            }
          </ol>
        </div>
        
        {
          breakpointTwo ? (
            <div
              className={`${styles['modalNav']} ${styles[isModalVisible ? 'open' : 'close']}`}
            >
              <div
                className={styles['dimmer']}
                onClick={() => setIsMobileVisible(false)}
                role='closeMenulogin'
              />

              <div
                className={styles['menu']}
              >
                <Link
                  to='/'
                >
                  <Logo
                    className={styles['logo']}
                  />
                </Link>
                

                <ButtonGroup
                  orientation='vertical'
                  color='secondary'
                  className={styles['linkGroup']}
                >
                  <Button
                    component={Link}
                    disableElevation
                    to='/shop'
                    variant={page === PAGES.shop ? 'contained' : 'outlined'}
                  >
                    Shop
                  </Button>

                  <Button
                    component={Link}
                    disableElevation
                    to='/about'
                    variant={page === PAGES.about ? 'contained' : 'outlined'}
                  >
                    About
                  </Button>

                  <Button
                    component={Link}
                    disableElevation
                    to='/contact'
                    variant={page === PAGES.contact ? 'contained' : 'outlined'}
                  >
                    Contact
                  </Button>

                  <Button
                    component={Link}
                    disableElevation
                    to='/policy'
                    variant={page === PAGES.policy ? 'contained' : 'outlined'}
                  >
                    Policy
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          ) : null
        }

      </nav>
    </>

  )
}

Navbar.propTypes = {
  navMode: t.oneOf([...Object.values(MODE)])
}

Navbar.default = {
  navMode: MODE.normal
}

export default Navbar
