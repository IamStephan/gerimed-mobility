import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
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

export default theme;