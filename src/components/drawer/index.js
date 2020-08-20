import React, { useState } from 'react'

// Gatsby
import { Link } from 'gatsby'

// Hooks
//import { useLockBodyScroll } from 'react-use'

// SVGs
import Logo from '../../svg/logo_green.svg'

// Constants
import { PAGES } from '../../constants/pages'

// Material
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Collapse,
  Divider
} from '@material-ui/core'
import {
  StorefrontOutlined,
  InfoOutlined,
  PhoneOutlined,
  PolicyOutlined,
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
    setOpen,
    token,
    page
  } = props

  const [accountOpen, setAccountOpen] = useState(false)

  function toggleAccount() {
    accountOpen ? setAccountOpen(false) : setAccountOpen(true)
  }

  /**
   * This seems extremely buggy therefor im skipping it
   */
  //useLockBodyScroll(open)

  return (
    <nav
      className={`${styles['drawer']} ${styles[open ? 'open' : 'closed']}`}
    >
      <div
        className={styles['dimmer']}
        onClick={() => {
          setOpen(false)
        }}
      />

      <div
        className={styles['menu']}
      >
        <ListItem>
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
            label='Policies'
            Icon={PolicyOutlined}
            selected={page === PAGES.policy}
            to='/policies'
          />
        </List>

        <Divider />

        <List>
          <ListItem
            button
            onClick={toggleAccount}
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
                token ? (
                  <>
                    <MenuItem
                      label='My Account'
                      Icon={ContactPhoneOutlined}
                      indent={true}
                      selected={page === PAGES.profile}
                      to='/profile'
                    />
                    <MenuItem
                      label='Logout'
                      Icon={ExitToAppOutlined}
                      indent={true}
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
            Icon={ShoppingCartOutlined}
            selected={page === PAGES.checkout}
          />
        </List>
      </div>
    </nav>
  )
}

export default Drawer
