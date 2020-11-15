import React, { useState, useRef, useEffect } from 'react'

// Gatsby
import { Link } from 'gatsby'

// SVGs
import Logo from '../../svg/logo_green.svg'

// Constants
import { PAGES } from '../../constants/pages'

// Hooks
import { useService } from '@xstate/react'

// Global Controllers
import { CartService, AuthService } from '../provider'

// Material
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Collapse,
  Divider,
  Badge
} from '@material-ui/core'
import {
  StorefrontOutlined,
  InfoOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  AccountCircleOutlined,
  ExpandLess,
  ExpandMore,
  ContactPhoneOutlined,
  ExitToAppOutlined,
  AddCircleOutline,
  MeetingRoomOutlined,
  ExploreOutlined
} from '@material-ui/icons'

// Styles
import styles from './styles.module.scss'

const CartWithBadge = () => {
  const [currentGlobal] = useService(CartService)

  const products = currentGlobal.context.cartData?.cart?.products || []

  return (
    <Badge badgeContent={products ? products.length : null} color="secondary">
      <ShoppingCartOutlined />
    </Badge>
  )
}

const MenuItemButton = props => {
  const {
    label,
    Icon,
    indent,
    selected
  } = props

  return (
    <ListItem
      button
      selected={selected}
      style={{
        paddingLeft: indent ? 48 : 16
      }}
      {...props}
    >
      {
        Icon ? (
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
        ) : null
      }

      <ListItemText
        inset={!Icon}
        primary={label}
      />
    </ListItem>
  )
}

const MenuItem = props => {
  const {
    label,
    to,
    Icon,
    indent,
    selected
  } = props

  return (
    <ListItem
      component={Link}
      to={to}
      button
      selected={selected}
      style={{
        paddingLeft: indent ? 48 : 16
      }}
    >
      {
        Icon ? (
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
        ) : null
      }

      <ListItemText
        inset={!Icon}
        primary={label}
      />
    </ListItem>
  )
}

const Drawer = props => {
  const {
    open,
    toggleDrawer,
    page
  } = props

  const [currentGlobal, sendGlobal] = useService(AuthService)
  const isLoggedIn = currentGlobal.matches({ idle: 'user' })

  const dimmerRef = useRef(null)

  const [accountOpen, setAccountOpen] = useState(false)
  const [hideDrawer, setHideDrawer] = useState(true)

  useEffect(() => {
    // Gatsby SSR
    if(typeof window === 'undefined' || !dimmerRef) return

    function _handleTransitionStart() {
      const opacity = Number(window.getComputedStyle(dimmerRef.current).getPropertyValue("opacity"))

      if(opacity < 0.5) {
        setHideDrawer(false)
      }
    }

    function _handleTransitionEnd() {
      const opacity = Number(window.getComputedStyle(dimmerRef.current).getPropertyValue("opacity"))

      if(opacity < 0.5) {
        setHideDrawer(true)
      }
    }

    const cleanUpTransitionStart = dimmerRef.current
    const cleanUpTransitionEnd = dimmerRef.current

    cleanUpTransitionStart.addEventListener('transitionstart', _handleTransitionStart)
    cleanUpTransitionEnd.addEventListener('transitionend', _handleTransitionEnd)
    
    return () => {
      cleanUpTransitionStart.removeEventListener('transitionstart', _handleTransitionStart)
      cleanUpTransitionEnd.removeEventListener('transitionend', _handleTransitionEnd)
    }
  }, [dimmerRef.current]) // eslint-disable-line react-hooks/exhaustive-deps 

  function _toggleAccount() {
    accountOpen ? setAccountOpen(false) : setAccountOpen(true)
  }

  return (
    <nav
      className={`${styles['drawer']} ${styles[open ? 'open' : 'closed']} ${styles[hideDrawer ? 'hide' : 'show']}`}
    >
      <div // eslint-disable-line
        className={styles['dimmer']}
        onClick={toggleDrawer}
        onKeyPress={(e) => {
          if(e.key === 27 && open) {
            toggleDrawer()
          }
        }}
        ref={dimmerRef}
      />

      <div
        className={styles['menu']}
      >
        <ListItem
          button
          component={Link}
          to='/'
        >
          <ListItemAvatar>
            <Avatar
              variant='rounded'
              className={styles['avatar']}
            >
              <Logo
                className={styles['logo']}
              />
            </Avatar>
          </ListItemAvatar>

          <ListItemText primary="Gerimed Mobility" secondary="Medical Supply Shop" />
        </ListItem>

        <Divider />

        <List>
          <MenuItem
            label='Shop'
            Icon={StorefrontOutlined}
            selected={page === PAGES.shop}
            to='/shop'
          />

          <MenuItem
            label='About Us'
            Icon={InfoOutlined}
            selected={page === PAGES.about}
            to='/about'
          />

          <MenuItem
            label='Contact Us'
            Icon={PhoneOutlined}
            selected={page === PAGES.contact}
            to='/contact'
          />

          <MenuItem
            label='Track My Order'
            Icon={ExploreOutlined}
            selected={page === PAGES.tracker}
            to='/trackorder'
          />
        </List>

        <Divider />

        <List>
          <ListItem
            button
            onClick={_toggleAccount}
          >
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>

            <ListItemText
              primary="Account" 
            />

            {
              accountOpen ? <ExpandLess /> : <ExpandMore />
            }
          </ListItem>

          <Collapse
            in={accountOpen}
            timeout="auto"
            unmountOnExit
          >
            <List
              disablePadding
            >
              {
                isLoggedIn ? (
                  <>
                    <MenuItem
                      label='My Account'
                      Icon={ContactPhoneOutlined}
                      indent={true}
                      selected={page === PAGES.profile}
                      to='/profile'
                    />
                    <MenuItemButton
                      label='Logout'
                      Icon={ExitToAppOutlined}
                      indent={true}
                      onClick={() => {
                        console.log('AWEEE')
                        sendGlobal('LOGOUT')
                        toggleDrawer()
                      }}
                    />
                  </>
                ) : (
                  <>
                    <MenuItem
                      label='Login'
                      Icon={MeetingRoomOutlined}
                      indent={true}
                      to='/profile/login'
                    />
                    <MenuItem
                      label='Register'
                      Icon={AddCircleOutline}
                      indent={true}
                      to='/profile/register'
                    />
                  </>
                )
              }
            </List>
          </Collapse>
          <MenuItem
            label='Cart'
            Icon={CartWithBadge}
            selected={page === PAGES.cart}
            to='/cart'
          />
        </List>
      </div>
    </nav>
  )
}

export default Drawer
