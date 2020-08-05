import React from 'react'
import { ThemeProvider } from '@material-ui/core'

// Notifications
import { SnackbarProvider } from 'notistack'

// Theme
import theme from './theme'

const Provider = props => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
      >
        { props.children }
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default Provider
