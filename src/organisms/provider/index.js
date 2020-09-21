import React, { createContext } from 'react'

// Material
import { ThemeProvider, createMuiTheme } from '@material-ui/core'

// Controller
import { CartController } from './controller'

// Xstate
import { interpret } from 'xstate'

// Notifications
import { SnackbarProvider } from 'notistack'

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

const CartControllerService = interpret(CartController).start()

// Global Context
export const GlobalContext = createContext({
  CartController: CartControllerService
})

const Provider = props => {
  return (
    <GlobalContext.Provider
      value={{
        CartController: CartControllerService
      }}
    >
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
          { props.children }  
        </SnackbarProvider>
      </ThemeProvider>
    </GlobalContext.Provider>
  )
}

export default Provider
