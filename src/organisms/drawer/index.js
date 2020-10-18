import React, { useState, useRef, useEffect } from 'react'

// Gatsby
import { Link } from 'gatsby'

// SVGs
import Logo from '../../svg/logo_green.svg'

// Constants
import { PAGES } from '../../constants/pages'

// Controller
import { LocalContoller } from './controller'

// Hooks
import { useMachine, useService } from '@xstate/react'

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
  MeetingRoomOutlined
} from '@material-ui/icons'

// Styles
import styles from './styles.module.scss'

const CartWithBadge = () => {
  const [currentGlobal, sendGlobal] = useService(CartService)

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
  const [current, send] = useMachine(LocalContoller)

  const [accountOpen, setAccountOpen] = useState(false)

  const hideDrawer = current.context.shouldBeHidden

  useEffect(() => {
    if(!dimmerRef) return

    send('SET_DIMMER_REF', {
      dimmerRef
    })
  }, [dimmerRef])

  function _toggleAccount() {
    accountOpen ? setAccountOpen(false) : setAccountOpen(true)
  }

  return (
    <nav
      className={`${styles['drawer']} ${styles[open ? 'open' : 'closed']} ${styles[hideDrawer ? 'hide' : 'show']}`}
    >
      <div
        className={styles['dimmer']}
        onClick={toggleDrawer}
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
