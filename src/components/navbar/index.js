import React from 'react'
import t from 'prop-types'

// Hooks
import { useMedia } from 'react-use'

// Gatsby
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'

// Material
import { Button, IconButton } from '@material-ui/core'
import { ShoppingCartOutlined, AccountCircleOutlined, Menu } from '@material-ui/icons'

// Styles
import styles from './styles.module.scss'

// Constants
import { PAGES } from '../../constants/pages'
import { MODE } from '../../constants/navbar'

// Style Utilities
import SIZES from '../../utils/sizes.scss'

const NormalButton = props => {
  const {
    mode,
    active
  } = props
  
  const buttonStyle = mode === MODE.trans ? '' : styles['button']

  return (
    <Button
      disableElevation
      component={Link}
      color={(mode === MODE.trans || active) ? 'primary' : 'inherit'}
      className={buttonStyle}
      style={{
        marginLeft: Number(SIZES.margin) * 4
      }}
      {...props}
    >
      {props.children}
    </Button>
  )
}


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
    mode
  } = props

  const breakpointTwo = useMedia(`(max-width: ${Number(styles.breakpointTwo)}px)`)

  return (
    <>
      <nav
        className={`${styles['navbar']} ${styles[mode]}`}
      >
        <div
          className={styles['container']}
        >
          <div
            className={styles['logo']}
          >
            <Img
              className={styles['img']}
              objectFit='contain'
              objectPosition='left center'
              fluid={data.file.childImageSharp.fluid}
              alt='Gerimed Mobility, Aiding you, to live a better live'
            />
          </div>
          {
            !breakpointTwo ? (
              <ol
                className={styles['links']}
              >
                <li>
                  <NormalButton
                    active={page === PAGES.store}
                    mode={mode}
                    to='/store'
                  >
                    Store
                  </NormalButton>
                </li>
                <li>
                  <NormalButton
                    active={page === PAGES.about}
                    mode={mode}
                    to='/about'
                  >
                    About Us
                  </NormalButton>
                </li>
                <li>
                  <NormalButton
                    active={page === PAGES.contact}
                    mode={mode}
                    to='/contact'
                  >
                    Contact
                  </NormalButton>
                </li>
                <li>
                  <NormalButton
                    active={page === PAGES.policy}
                    mode={mode}
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
                  >
                    <Menu />
                  </IconButton>
              </li>
              ) : null
            }
          </ol>
        </div>

      </nav>
    </>

  )
}

Navbar.propTypes = {
  mode: t.oneOf([...Object.values(MODE)])
}

Navbar.default = {
  mode: MODE.normal
}

export default Navbar
