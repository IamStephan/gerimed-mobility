import React, { useEffect } from 'react'

// Material
import { ThemeProvider, createMuiTheme } from '@material-ui/core'

// Modals
import ReconcileModal from '../../molecules/reconcile_modal'
import LogoutModal from '../../molecules/logout_modal'

// Controllers
import { AuthController } from './controllers/auth_controller'
import { CartController } from './controllers/cart_controller'

// Storage
import { storageFactory } from '../../utils/js/storageFactory'

// Xstate
import { interpret } from 'xstate'

// Hooks
import { useService } from '@xstate/react'

// Notifications
import { SnackbarProvider, useSnackbar } from 'notistack'

// Global Theme
const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#FFFF01',
      main: '#FFFF01',
      dark: '#FFFF01'
    },
    secondary: {
      main: '#008835',
    }
  },
});

// Notification styles
const notiStyles = {
  success: { zIndex: 999 },
  error: { zIndex: 999 },
  warning: { zIndex: 999 },
  info: { zIndex: 999 },
};

// Storage Mechanism
export const LocalStorage = storageFactory(() => window.localStorage)
export const SessionStorage = storageFactory(() => window.sessionStorage)

export const AuthService = interpret(AuthController).start()
export const CartService = interpret(CartController).start()

const AuthNotifications = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [, sendAuth] = useService(AuthService)
  const [, sendCart] = useService(CartService)

  useEffect(() => {
    sendAuth('SET_NOTIFICATIONS_HANDLER', {
      enqueueSnackbar
    })
    sendCart('SET_NOTIFICATIONS_HANDLER', {
      enqueueSnackbar
    })
  }, [])

  return null
}

const Provider = props => {
  return (
    <ThemeProvider
      theme={theme}
    >
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}

        classes={{
          variantSuccess: notiStyles.success,
          variantError: notiStyles.error,
          variantWarning: notiStyles.warning,
          variantInfo: notiStyles.info,
        }}
        preventDuplicate
      >
        <AuthNotifications />
        <ReconcileModal />
        <LogoutModal />


        { props.children }  
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default Provider
