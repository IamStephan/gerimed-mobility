const MODES = {
  loading: 'LOADING',
  staleLoad: 'STALE_LOAD',
  show: 'SHOW'
}

const LOGIN_PATHS = {
  normal: '/profile/login',
  password: '/profile/login/password_reset',
  email: '/profile/login/email'
}

const USER_TABS = {
  info: 'INFO',
  shipping: 'SHIPPING',
  settings: 'SETTINGS',
  purchase: 'PURCHASE'
}

const TOKEN_KEY = {
  jwt: 'JWT_TOKEN_MOBILITY'
}

const INVOICE_VIEW_STATE = {
  loading: 'LOADING',
  empty: 'EMPTY',
  error: 'ERROR',
  show: 'SHOW'
}


export {
  MODES,
  LOGIN_PATHS,
  USER_TABS,
  INVOICE_VIEW_STATE,
  TOKEN_KEY
}